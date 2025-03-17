"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";

import UserBlogs from "./components/userBlogs";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const res = await fetch(`${baseUrl}/api/user/${username}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (username) fetchUser();
  }, [username]);
  // console.log(user)
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        {/* <h2 className="text-xl font-semibold">User not Found</h2> */}
      </div>
    );
  }

  return (
    
    <div className="w-full">
      {/* Full-width Profile Header */}
      
      <div className="max-w-5xl mx-auto border-white shadow-lg rounded-lg">
        <ProfileHeader user={user} setUser={setUser} />
      </div>
      {/* Main Content: About Section + Blogs */}
      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section (1/3 width on larger screens) */}
        <div className="md:col-span-1">
          {<AboutSection about={user.about} />}
        </div>

        {/* Blogs Section (2/3 width on larger screens) */}
        <div className="md:col-span-2">
          <UserBlogs />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
