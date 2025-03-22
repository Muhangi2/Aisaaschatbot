import { onLoginUser } from "@/actions/auth";
import SideBar from "@/components/sidebar";
import { ChatProvider } from "@/context/user-chat-context";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser();

  if (!authenticated) return null;

  return (
    <ChatProvider>
      <div className="flex h-screen w-full bg-gradient-to-b from-[#1e3a8a]/10 to-[#eab308]/10 relative overflow-hidden">
        {/* Corner Gradients with Blue Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <SideBar domains={authenticated?.domain || []} />
        <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;