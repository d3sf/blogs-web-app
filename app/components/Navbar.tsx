"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession(); // Get user session
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

  const handleClick = () => {

  }

  return (
    <nav className="flex justify-between m-8 relative">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-customPink tracking-widest">
        <Link href={`/blogs`}>Blogs</Link>
      </h2>

      {/* Right Section */}
      <div className="flex space-x-4 items-center">
        {/* Write Button */}
        <Link href={"/write"}>
          <div className="flex items-center space-x-2 cursor-pointer hover:text-customPink" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path>
              <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path>
            </svg>
            <span>Write</span>
          </div>
        </Link>
        {/* Profile Dropdown */}
        <div ref={dropdownRef} className="relative">
          {session?.user ? (
            <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <img src={session.user.image || "/default-avatar.png"} alt="User Avatar" className="w-full h-full object-cover" />
            </button>
          ) : (
            <Link href="/signin" className="border px-4 py-1 rounded-md">
              Sign In
            </Link>
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
  );
};

export default Navbar;
