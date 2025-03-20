import { SIDE_BAR_MENU } from '@/constants/menu';
import React from 'react';
import { LogOut, MonitorSmartphone } from 'lucide-react';
import { MenuLogo } from '@/icons/menu-logo';
import MenuItem from './menu-item';
import DomainMenu from './domain-menu';

type MinMenuProps = {
  onShrink(): void;
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

export const MinMenu = ({
  onShrink,
  current,
  onSignOut,
  domains,
}: MinMenuProps) => {


  return (
    <div className="p-3 flex flex-col items-center h-full bg-gray-900 text-white ">
      {/* Menu Logo */}
      <span className="cursor-pointer">
        <MenuLogo onClick={onShrink} />
      </span>

      {/* Menu Items */}
      <div className="flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col items-center">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem
              size="min"
              {...menu}
              key={key}
              current={current}
            />
          ))}
          <DomainMenu min domains={domains} />
        </div>

        {/* Options */}
        <div className="flex flex-col items-center bg-green-500">
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut className="w-6 h-6" />}
            onSignOut={onSignOut}
          />
          {/* <MenuItem
            size="min"
            label="Mobile App"
            icon={<MonitorSmartphone className="w-6 h-6" />}
          /> */}
        </div>
      </div>
    </div>
  );
};
