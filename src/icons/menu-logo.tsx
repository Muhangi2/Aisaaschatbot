import React from "react";

type MenuLogoProps = {
  onClick(): void;
};

export const MenuLogo = ({ onClick }: MenuLogoProps) => {
  return (
    <div className="flex items-center gap-2" onClick={onClick}>
    
    <span className="text-[#1e3a8a] font-sans font-bold text-sm">Tera</span>
  </div>
  );
};