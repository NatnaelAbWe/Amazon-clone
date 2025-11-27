import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import SignUp from "../Page/Auth";
import { Link } from "react-router-dom";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="w-full bg-black text-white">
      {/* desktop header */}
      <div className="hidden md:flex max-w-full mx-auto px-4 py-3 items-stretch justify-between gap-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <a href="#" className="hover:outline p-1 rounded-sm">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
              className="w-28 pt-2"
            />
          </a>

          {/* Location */}
          <div className="flex items-center gap-1 hover:outline  p-1 rounded-sm cursor-pointer">
            <CiLocationOn className="w-6 h-6" />
            <div>
              <p className="text-xs text-gray-300">Delivered to</p>
              <p className="font-bold text-sm">Ethiopia</p>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex flex-1 max-w-full h-11 mt-2">
          <select className="bg-gray-200 text-black px-2 rounded-l-md border-r border-gray-400 text-sm">
            <option>All</option>
            <option>None</option>
          </select>

          <input
            type="text"
            placeholder="Search Amazon"
            className="hidden md:block md:w-[90%] flex-1 px-4 text-black focus:outline-none bg-white"
          />

          <button className="w-14 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 rounded-r-md">
            <CiSearch className="h-7 w-7 text-black" />
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          {/* Language */}
          <div className="flex items-center gap-1 hover:outline  p-1 rounded-sm cursor-pointer">
            <img
              src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
              alt="USA Flag"
              className="w-6 h-4 object-cover"
            />
            <select className="bg-black text-white text-sm">
              <option>EN</option>
              <option>AM</option>
              <option>OR</option>
            </select>
          </div>

          {/* Account */}
          <a href="#" className="hover:outline p-1 rounded-sm">
            <Link to="/signup">
              <p className="text-xs">Hello, sign in</p>
            </Link>
            <p className="font-bold text-sm">Account & Lists</p>
          </a>
          {/* Orders */}
          <Link to="/orders" className="hover:outline  p-1 rounded-sm">
            <p className="text-xs">Returns</p>
            <p className="font-bold text-sm">& Orders</p>
          </Link>

          {/* Cart */}
          <div className="relative hover:outline  p-1 rounded-sm cursor-pointer">
            <IoCartOutline className="w-8 h-8" />
            <span className="absolute top-0 left-6 bg-yellow-400 text-black text-xs px-1 rounded-full">
              0
            </span>
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        {/* Hamburger Button */}
        <button onClick={() => setOpenMenu(true)}>
          <RxHamburgerMenu className="w-7 h-7" />
        </button>

        {/* Logo */}
        <Link href="/">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            className="w-24"
            alt="amazon"
          />
        </Link>

        {/* Cart */}
        <div className="relative cursor-pointer">
          <IoCartOutline className="w-8 h-8" />
          <span className="absolute -top-1 left-4 bg-yellow-400 text-black text-xs px-1 rounded-full">
            0
          </span>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex h-10">
          <input
            type="text"
            placeholder="Search Amazon"
            className="flex-1 px-3 text-black rounded-l-md focus:outline-none bg-white"
          />
          <button className="w-12 flex items-center justify-center bg-yellow-500 rounded-r-md">
            <CiSearch className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>

      {/* mobile menu */}

      {openMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50">
          <div className="w-72 h-full bg-white text-black overflow-y-auto p-4 animate-slide-right">
            {/* Close Button */}
            <button
              onClick={() => setOpenMenu(false)}
              className="flex justify-end w-full mb-4"
            >
              <IoClose className="w-7 h-7 text-black" />
            </button>

            {/* Profile Section */}
            <div className="mb-4">
              <p className="text-sm">Hello, sign in</p>
              <p className="font-semibold text-lg">Your Account</p>
            </div>

            {/* Menu Sections */}
            <div className="space-y-5">
              {/* Lists */}
              <div className="border-b pb-3">
                <h4 className="font-bold mb-2">Your Lists</h4>
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-yellow-600">Create a List</li>
                  <li className="hover:text-yellow-600">Wish List</li>
                </ul>
              </div>

              {/* Account */}
              <div className="border-b pb-3">
                <h4 className="font-bold mb-2">Your Account</h4>
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-yellow-600">Orders</li>
                  <li className="hover:text-yellow-600">Returns</li>
                  <li className="hover:text-yellow-600">Language</li>
                  <li className="hover:text-yellow-600">Country: Ethiopia</li>
                </ul>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 pt-3">
                <CiLocationOn className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="text-xs text-gray-500">Deliver to</p>
                  <p className="font-semibold text-sm">Ethiopia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* mobile menu animation */}
      <style>{`
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-right {
          animation: slideRight 0.25s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
