import React from "react";
import SignUp from "../../../app/auth/sign-up/page";
import { AuthContextProvider } from "@/context/use-auth-context";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  return <AuthContextProvider>
    
  </AuthContextProvider>;
};

export default SignUpFormProvider;
