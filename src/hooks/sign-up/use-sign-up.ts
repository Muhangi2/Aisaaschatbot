'use client'
// import { useToast } from '@/components/ui/use-toast'
import { useToast } from '../use-toast'
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { onCompleteUserRegistration, checkUserStatus } from '@/actions/auth'

export const useSignUpForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { signUp, isLoaded, setActive } = useSignUp()
  const router = useRouter()
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: 'owner',
    },
    mode: 'onChange',
  })

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return

    try {
      // First check if user exists
      const existingUser = await signUp.create({
        emailAddress: email,
        password: password,
      })

      if (existingUser.status === 'complete') {
        toast({
          title: 'Error',
          description: 'An account with this email already exists. Please sign in instead.',
        })
        router.push('/auth/sign-in')
        return
      }

      // If user doesn't exist, proceed with OTP
      try {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        onNext((prev) => prev + 1)
      } catch (error: any) {
        if (error.errors[0].code === 'form_identifier_exists') {
          toast({
            title: 'Error',
            description: 'An account with this email already exists. Please sign in instead.',
          })
          router.push('/auth/sign-in')
        } else {
          toast({
            title: 'Error',
            description: error.errors[0].longMessage,
          })
        }
      }
    } catch (error: any) {
      if (error.errors[0].code === 'form_identifier_exists') {
        toast({
          title: 'Error',
          description: 'An account with this email already exists. Please sign in instead.',
        })
        router.push('/auth/sign-in')
      } else {
        toast({
          title: 'Error',
          description: error.errors[0].longMessage,
        })
      }
    }
  }

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) {
        toast({
          title: 'Error',
          description: 'Authentication service not loaded. Please try again.',
        });
        return;
      }

      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        if (completeSignUp.status !== 'complete') {
          toast({
            title: 'Error',
            description: 'OTP verification failed. Please try again.',
          });
          setLoading(false);
          return;
        }

        if (completeSignUp.status === 'complete' && signUp.createdUserId) {
          // First check if user already exists
          const userStatus = await checkUserStatus(signUp.createdUserId);
          
          if (userStatus.status === 200) {
            toast({
              title: 'Account Exists',
              description: 'This account is already registered. Please sign in instead.',
            });
            router.push('/auth/sign-in');
            return;
          }

          const registered = await onCompleteUserRegistration(
            values.fullname,
            signUp.createdUserId,
            values.type
          );

          if (registered?.status === 200 && registered.user) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });
            
            toast({
              title: 'Success',
              description: registered.message || 'Account created successfully! Welcome to our platform.',
            });
            
            router.push('/dashboard');
          } else if (registered?.status === 409) {
            toast({
              title: 'Account Exists',
              description: 'This account is already registered. Please sign in instead.',
            });
            router.push('/auth/sign-in');
          } else {
            toast({
              title: 'Registration Failed',
              description: registered?.message || 'Failed to complete registration. Please try again.',
            });
          }
        }
      } catch (error: any) {
        console.error('Sign up error:', error);
        toast({
          title: 'Error',
          description: error.errors?.[0]?.longMessage || 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  );

  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  }
}