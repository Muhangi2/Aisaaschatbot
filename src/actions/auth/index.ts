'use server'

import { client } from '@/lib/prisma'
import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { onGetAllAccountDomains } from '../settings'

export const onCompleteUserRegistration = async (
    fullname: string,
    clerkId: string,
    type: string
) => {
    try {
        // First check if user already exists in our database
        const existingUser = await client.user.findUnique({
            where: { clerkId }
        });

        if (existingUser) {
            console.log(`User with clerkId ${clerkId} already exists in database`);
            return { status: 409, message: 'User already registered' };
        }

        const registered = await client.user.create({
            data: {
                fullname,
                clerkId,
                type,
                subscription: {
                    create: {
                        plan: 'STANDARD',
                        credits: 10
                    },
                },
            },
            select: {
                fullname: true,
                id: true,
                type: true,
                subscription: true,
                createdAt: true,
            },
        });

        if (registered) {
            console.log(`Successfully registered user: ${registered.fullname} with ID: ${registered.id}`);
            return { 
                status: 200, 
                user: registered,
                message: 'Registration successful. Welcome to our platform!'
            };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { 
            status: 400, 
            message: error instanceof Error ? error.message : 'Failed to register user'
        };
    }
}

export const onLoginUser = async () => {
    const user = await currentUser()
    if (!user) redirectToSignIn()
    else {
        try {
            const authenticated = await client.user.findUnique({
                where: {
                    clerkId: user.id,
                },
                select: {
                    fullname: true,
                    id: true,
                    type: true,
                },
            })
            console.log(authenticated,"authenticatedddddd.................")
       
            if (authenticated) {
                const domains = await onGetAllAccountDomains()
                return { status: 200, user: authenticated, domain: domains?.domains }
            }
        } catch (error) {
            console.log(error)
            return { status: 400 }
        }
    }
}

export const checkUserStatus = async (clerkId: string) => {
    try {
        const user = await client.user.findUnique({
            where: { clerkId },
            select: {
                id: true,
                fullname: true,
                type: true,
                subscription: true,
                createdAt: true,
            }
        });

        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        return { 
            status: 200, 
            user,
            message: 'User found'
        };
    } catch (error) {
        console.error('Error checking user status:', error);
        return { 
            status: 400, 
            message: 'Failed to check user status'
        };
    }
}