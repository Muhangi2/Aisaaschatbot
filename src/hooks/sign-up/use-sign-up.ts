import { useToast } from "@/hooks/use-toast"
import { useState } from 'react';
import { useSignUp } from "@clerk/nextjs";
import { useForm}

export const useSignUpForm = () => {
    const { toast } = useToast()
    const [loading, setLoading] = useState()
    const { SignUp, isLoaded, seetActive } = useSignUp()
}