import { PortalBanner } from "@/components/portal";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col md:h-screen ">
      <PortalBanner />
      <div className="container flex justify-center flex-1 h-0 mt-12">
        {children}
      </div>
    </div>
  );
};

export default Layout;


 {/* {expand ? (
        <MaxMenu
          domains={domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          onShrink={onExpand}
          current={page!}
          onSignOut={onSignOut}
        />
      )} */}