import React from "react";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { AuthContextProvider } from "@/context/use-auth-context";
import { FormProvider } from "react-hook-form";
import { Loader } from "../../loader/index";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading ?? false}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignUpFormProvider;
