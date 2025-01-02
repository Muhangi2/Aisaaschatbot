import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAuthContextHook } from "@/context/use-auth-context";

type Props = {};

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { currentStep } = useAuthContextHook();
  const [onOTP, setOnOTP] = useState<string>("");
  const [onUserType, setOnUserType] = useState<"owner" | "student">("owner");
  setValue('otp', onOTP)
  
  return <div></div>;
};

export default RegistrationFormStep;
