"use client";

import useSideBar from "@/context/use-sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import MaxMenu from "./maximized-menu";
import { MinMenu } from "./minimized-menu";

type Props = {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

const SideBar = ({ domains }: Props) => {
  const { expand, onExpand, page, onSignOut } = useSideBar();
  
  return (
    <div
      className={cn(
        "bg-cream dark:bg-neutral-950 h-full z-50 fill-mode-forwards",
        "fixed md:relative",
        expand === undefined ? "w-[60px]" : "",
        expand === true
          ? "animate-open-sidebar w-[240px]"
          : expand === false && "animate-close-sidebar w-[60px]"
      )}
    >
      {expand ? (
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
      )}
    </div>
  );
};

export default SideBar;