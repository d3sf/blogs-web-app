"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import WriteBtn from "./ui/WriteBtn";

const Navbar = () => {
  const { data: session, status, update } = useSession(); // Include update function
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(session?.user?.image); // Store image locally
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showWriteBtn = pathname === "/write" || pathname === "/edit/[id]";

  // Update profile picture only when user updates their profile
  useEffect(() => {
    const checkProfileUpdate = async () => {
      if (!session?.user) return; // ✅ Don't fetch if user is not logged in

      try {
        const res = await axios.get("/api/user/me"); // Fetch latest user data
        if (res.data?.image && res.data.image !== profilePic) {
          setProfilePic(res.data.image); // Update local state
          update(); // Refresh session once
        }
      } catch (error) {
        console.error("Error fetching updated user data:", error);
      }
    };

    checkProfileUpdate();
  }, [session, update]);

  const handleProfileClick = async () => {
    try {
      const response = await axios.get("/api/user/me");
      if (response.data?.username) {
        router.push(`/${response.data.username}`);
      } else {
        console.error("Username not found in API response");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="sticky top-0 bg-white z-50">
      <nav className="flex justify-between p-2 relative">
        <h2 className="text-2xl font-bold ml-4 mt-1 text-customPink tracking-widest">
          <Link href="/">Blogs</Link>
        </h2>

        <div className="flex space-x-4 items-center text-xs mr-3">
          {!showWriteBtn && (
            <Link href="/write">
              <div className="flex items-center space-x-2 cursor-pointer hover:text-customPink">
                <WriteBtn />
                <span>Write</span>
              </div>
            </Link>
          )}

          {/* Profile Dropdown or Sign In/Sign Up */}
          <div ref={dropdownRef} className="relative">
            {status === "loading" ? null : session?.user ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
              >
                <img
                  src={profilePic || "/images/defaultAvatar.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/signup"
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="bg-white text-black border border-black px-4 py-2 rounded-full hover:bg-gray-100"
                >
                  Sign In
                </Link>
              </div>
            )}

            {isOpen && (
              
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
                {/* <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleProfileClick}
                >
                  Settings
                </button> */}
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default Navbar;
