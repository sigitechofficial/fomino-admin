import React from "react";
import { PiUserBold } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-[calc(100%-280px)] ml-[280px] bg-theme border-b border-themeLightGray fixed z-40">
      <div className="col-span-7 py-[9px] px-10 flex justify-end items-center gap-x-5">
        <div>
          <FaRegBell size={26} color="white" />
        </div>
        <div className="w-12 h-12 bg-[#222222] rounded-full flex items-center justify-center">
          <PiUserBold size={28} color="white" />
        </div>
        <div>
          <p className="text-white text-sm font-normal font-workSans">Admin</p>
        </div>
      </div>
    </header>
  );
}
