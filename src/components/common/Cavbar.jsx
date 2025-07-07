import React, { useState } from "react";
import {
  Search,
  Bell,
  Menu,
  UserRound,
  Files,
  FileHeart,
  FileUser,
  Pencil,
  Palette,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MainSidebar from "./MainSidebar"; // Make sure to import your MainSidebar component

export default function Cavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#f9f7f3] h-13 flex items-center justify-between border border-[#d4cba2]">
        <div className="flex justify-start items-center gap-5 ml-1">
          {/* Replace PanelRight with Menu icon for sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="hover:bg-deeper p-2.5 rounded-full cursor-pointer"
          >
            <Menu size={20} className="text-ctext" />
          </button>
          <img src="/images/logo.png" alt="cat" className="w-[70px]" />
        </div>

        {/* search bar pc only */}
        <div className="hidden md:block md:w-[450px] lg:w-[550px] border border-[#d4cba2] rounded-full">
          <Search size={15} className="text-ctext inline mx-3" />
          <input
            type="text"
            placeholder="Search"
            className="md:w-[400px] lg:w-[500px] outline-0 text-[15px] h-9 pr-10 border-[#f9f7f3] rounded-full bg-[#f9f7f3]"
          />
        </div>

        {/* left side profile, notification, list, search */}
        <div className="mr-1 flex">
          <ul className="flex gap-1 md:gap-1.5 items-center">
            <li className="p-1.5 rounded-full bg-deeper md:hidden bg-[#eee6cc] border border-[#d4cba2] cursor-pointer flex items-center justify-center">
              <Search size={18} className="text-ctext" />
            </li>

            {/* My Lists Popover */}
            <Popover>
              <PopoverTrigger>
                <li className="py-1 px-2 flex items-center rounded-full bg-[#eee6cc] border border-[#d4cba2] cursor-pointer">
                  <Files size={17} />
                  <span className="text-[13px] pl-[3px] text-ctext">
                    My Lists
                  </span>
                </li>
              </PopoverTrigger>
              <PopoverContent className="bg-white max-w-[150px] border border-[#d4cba2] py-2 px-2 mr-3">
                <ul className="flex flex-col gap-2 ">
                  <li className="py-1 px-2 flex items-center rounded-sm hover:bg-[#eee6cc] cursor-pointer">
                    <FileUser size={17} />
                    <span className="text-[13px] pl-[5px] text-ctext">
                      Owned Books
                    </span>
                  </li>
                  <hr className="border-t border-gray-300" />
                  <li className="py-1 px-2 flex items-center rounded-sm hover:bg-[#eee6cc] cursor-pointer">
                    <FileHeart size={17} />
                    <span className="text-[13px] pl-[5px] text-ctext">
                      Wish List
                    </span>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>

            {/* Notifications Popover */}
            <Popover>
              <PopoverTrigger>
                <li className="p-1.5 rounded-full bg-[#eee6cc] border border-[#d4cba2] cursor-pointer flex items-center justify-center">
                  <Bell size={18} className="text-ctext" />
                </li>
              </PopoverTrigger>
              <PopoverContent className="bg-white max-w-[300px] h-[300px] md:min-h-[500px] border border-[#d4cba2] py-2 px-2 mr-3">
                <div className="flex justify-center items-center h-[300px] md:min-h-[500px] text-black/75">
                  <span>No Notifications</span>
                </div>
              </PopoverContent>
            </Popover>

            {/* Profile Popover */}

            <Popover>
              <PopoverTrigger asChild>
                <button className="p-1.5 rounded-full bg-[#eee6cc] border border-[#d4cba2] cursor-pointer hover:bg-[#e0d8b8] transition-colors">
                  <UserRound size={18} className="text-ctext" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[280px] bg-white border border-[#d4cba2] rounded-lg shadow-lg p-0 overflow-hidden"
                align="end"
                sideOffset={8}
              >
                {/* Profile Header */}
                <div className="bg-[#f9f7f3] p-6 flex flex-col items-center border-b border-[#d4cba2]">
                  <div className="relative mb-4">
                    <CircleUserRound size={70} className="text-[#a39b75]" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Demo User
                  </h3>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button className="w-full flex items-center px-4 py-3 text-sm text-left hover:bg-[#f5f2e8] rounded-md transition-colors">
                    <Palette size={16} className="mr-3 text-[#a39b75]" />
                    Theme Settings
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-left hover:bg-[#f5f2e8] rounded-md transition-colors">
                    <LogOut size={16} className="mr-3 text-[#a39b75]" />
                    Log Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            {/* ----------------------------------- */}
          </ul>
        </div>
      </div>

      {/* Sidebar Component */}
      <MainSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
