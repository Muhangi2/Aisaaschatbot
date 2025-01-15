import { onLoginUser } from "@/actions/auth";
import SideBar from "@/components/sidebar";
import { ChatProvider } from "@/context/user-chat-context";
import React from "react";
import { SIDE_BAR_MENU } from "@/constants/menu";

type Props = {
  children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser();
  console.log(authenticated, "authenticated");
  if (!authenticated) return null;

  return (
    <ChatProvider>
      <div className="flex h-screen w-full ">
        <SideBar domains={authenticated?.domain || []} />
        <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
