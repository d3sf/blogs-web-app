"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import path from "path";
import WriteBtn from "./ui/WriteBtn";

const Navbar = () => {
  const { data: session, status } = useSession(); // Get user session
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  const pathname = usePathname();
  // pathname === "/write" will be true or false based on the current path
  // the value of showPublishBtn = true
  const showPublishBtn = pathname === "/write" || pathname === "/edit/[id]";
  const showWriteBtn = pathname === "/write" || pathname === "/edit/[id]";

  return (
    <div className="sticky top-0  bg-white">
      {/* make the navbar fixed */}

      <nav className="flex  justify-between p-2 relative">
        {/* Logo */}
        <h2 className="text-2xl font-bold ml-4 mt-1 text-customPink tracking-widest">
          <Link href={`/`}>Blogs</Link>
        </h2>

        {/* Right Section */}
        <div className="flex space-x-4 items-center text-xs mr-3">
          {/* Write Button */}

          {showPublishBtn && (
            <Link href="/write" className="bg-green-600 text-white px-2 rounded-full  hover:bg-green-700 hover:text-white text-[10px]"
            // onclick logic here
            >
              Publish
            </Link>
          )}
          
        {!showWriteBtn && (
            <Link href={"/write"}>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-customPink">
              <WriteBtn></WriteBtn>
              <span>Write</span>
            </div>
          </Link>
        )}


          {/* Profile Dropdown or Sign In/Sign Up */}
          <div ref={dropdownRef} className="relative">
          {status === "loading" ? null : session?.user ? (

              <button onClick={() => setIsOpen(!isOpen)} className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <img src={session.user.image || "/default-avatar.png"} alt="User Avatar" className="w-full h-full object-cover" />
              </button>
            ) : (
              <div className="flex space-x-2">
                {/* Signup Button */}
                <Link href="/signup" className="bg-black text-white px-4 py-2 rounded-full  hover:bg-gray-800 hover:text-white">
                  Sign Up
                </Link>

                {/* Signin Button */}
                <Link href="/signin" className="bg-white text-black border border-black px-4 py-2 rounded-full hover:bg-gray-100">
                  Sign In
                </Link>
              </div>
            )}

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Bottom border on navbar */}
      <hr className="border-t border-gray-300" />

    </div>
  );
};

export default Navbar;
