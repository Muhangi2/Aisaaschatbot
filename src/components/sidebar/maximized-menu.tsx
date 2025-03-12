import { SIDE_BAR_MENU } from "@/constants/menu";
import { LogOut, Menu, MonitorSmartphone } from "lucide-react";
import Image from "next/image";
import React from "react";
import DomainMenu from "./domain-menu";
import MenuItem from "./menu-item";

type Props = {
  onExpand(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[] 
    | null 
    | undefined;
};

const MaxMenu = ({ current, domains, onExpand, onSignOut }: Props) => {
  // console.log(SIDE_BAR_MENU, "SIDEBAR MENUUUUUUUUUUUU");
  return (
    <div className="py-3 px-4 flex flex-col h-full ">
      <div className="flex justify-between items-center ">
        <Image
          src="/images/logo.png"
          alt="LOGO"
          width={100}
          height={50}
          className="opacity-100"
        />
        <Menu
          className="cursor-pointer text-white w-6 h-6"
          onClick={onExpand}
        />
      </div>
      <div className="flex flex-col justify-between h-full pt-10 ">
        <div className="flex flex-col">
          <p className="text-xs text-white mb-3">MENU</p>
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="max" {...menu} key={key} current={current} />
          ))}
          <DomainMenu domains={domains} />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-white mb-3">OPTIONS</p>
          <MenuItem
            size="max"
            label="Sign out"
            icon={<LogOut className="text-white w-6 h-6" />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="max"
            label="Mobile App"
            icon={<MonitorSmartphone className="text-white w-6 h-6" />}
          />
        </div>
      </div>
    </div>
  );
};

export default MaxMenu;
