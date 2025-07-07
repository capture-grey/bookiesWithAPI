// components/common/Navbar.jsx
import { useState, useContext } from "react";
import { Menu } from "lucide-react";
import MainSidebar from "./MainSidebar";

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-[#f9f7f3] border-b border-[#d4cba2]">
        <div className="px-4 py-3 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-[#eee6cc]"
          >
            <Menu className="w-5 h-5 text-[#5a4a3a]" />
          </button>
        </div>
      </nav>

      <MainSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};
