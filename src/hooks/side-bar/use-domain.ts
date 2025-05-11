import { onIntegrateDomain } from '@/actions/settings'
// import { useToast } from '@/components/ui/use-toast'
import { useToast } from '@/hooks/use-toast'
import { AddDomainSchema } from '@/schemas/settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadClient } from '@uploadcare/upload-client'
import { usePathname, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

// Initialize UploadCare client with error handling
const getUploadClient = () => {
    const publicKey = process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY;
    if (!publicKey) {
        console.error('UploadCare public key is not configured');
        return null;
    }
    return new UploadClient({ publicKey });
};

export const useDomain = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        resolver: zodResolver(AddDomainSchema),
    })

    const pathname = usePathname()
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const [isDomain, setIsDomain] = useState<string | undefined>(undefined)
    const router = useRouter()

    useEffect(() => {
        setIsDomain(pathname.split('/').pop())
    }, [pathname])

    const onAddDomain = handleSubmit(async (values: FieldValues) => {
        try {
            setLoading(true);
            
            // Check if we have an image to upload
            if (!values.image?.[0]) {
                toast({
                    title: 'Error',
                    description: 'Please select an image to upload',
                });
                return;
            }

            // Get upload client
            const upload = getUploadClient();
            if (!upload) {
                toast({
                    title: 'Error',
                    description: 'File upload service is not configured',
                });
                return;
            }

            // Upload the file
            const uploaded = await upload.uploadFile(values.image[0]);
            console.log("uploaded", uploaded);

            if (!uploaded?.uuid) {
                throw new Error('Failed to upload image');
            }

            // Integrate domain with the uploaded image
            const domain = await onIntegrateDomain(values.domain, uploaded.uuid);
            
            if (domain) {
                reset();
                setLoading(false);
                toast({
                    title: domain.status === 200 ? 'Success' : 'Error',
                    description: domain.message,
                });
                router.refresh();
            }
        } catch (error) {
            console.error('Domain creation error:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create domain',
            });
        } finally {
            setLoading(false);
        }
    });

    return {
        register,
        onAddDomain,
        errors,
        loading,
        isDomain,
    }
}
