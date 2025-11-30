import React from "react";
import { MdOutlineMenu } from "react-icons/md";

function LowerHeader() {
  return (
    <div className="hidden md:block w-full bg-[#232f3e] text-white">
      <ul className="flex items-center gap-6 px-6 py-2 text-sm">
        <li className="flex items-center gap-1 cursor-pointer font-semibold">
          <MdOutlineMenu size={22} />
          <p>All</p>
        </li>

        <li className="cursor-pointer hover:underline">Today's Deals</li>
        <li className="cursor-pointer hover:underline">Customer Services</li>
        <li className="cursor-pointer hover:underline">Registry</li>
        <li className="cursor-pointer hover:underline">Gift Cards</li>
        <li className="cursor-pointer hover:underline">Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
