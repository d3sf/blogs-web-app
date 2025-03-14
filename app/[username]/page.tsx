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
        <h2 className="text-xl font-semibold">User not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className=" border-white shadow-lg  rounded-lg
      
      ">
        {/* Profile Header */}
        <ProfileHeader user={user} setUser={setUser} />
      </div>

      <div>
        {/* About Section */}
        {user.about && <AboutSection about={user.about} />}
      </div>
      {/* <UserBlogContainer></UserBlogContainer> */}
      <UserBlogs></UserBlogs>

    </div>

  );
};

export default UserProfile;
