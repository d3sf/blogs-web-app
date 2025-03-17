"use client";

import { useState } from "react";
import ChangeProfilePicModal from "./ChangeProfilePicModal";
import EditProfileModal from "./EditProfileModal";
import { Calendar } from "lucide-react";
import { formattedMonthYear } from "@/app/components/utility/formattedTime";
import { useSession } from "next-auth/react";

const ProfileHeader = ({ user, setUser }) => {
  const { data: session } = useSession();
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const date = formattedMonthYear(user.createdAt);
  const isOwner = session?.user?.email === user.email;

  return (
    <div>
      <div className="flex justify-between py-[32px] px-[12px]">
        <div className="flex gap-6">
          <div
            className="relative w-28 h-28"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Profile Image */}
            {/* {JSON.stringify(user.image)}
            <br />
            {JSON.stringify(session.user.image)} */}
            <img
              src={user?.image || "/images/defaultAvatar.png"}
              alt={user?.name}
              className="w-full h-full rounded-full border-4 border-gray-300 object-cover"
            />
            {isOwner && isHovering && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer"
                onClick={() => setIsProfilePicModalOpen(true)}
              >
                <span className="text-white text-sm">Edit</span>
              </div>
            )}
          </div>

          <div className="mt-12">
            <div className="text-2xl font-bold">{user.name}</div>
            <div className="text-gray-600 text-xs border border-gray-600 rounded-full mt-2 inline-flex items-center text-[10px] px-1">
              <Calendar size={14} />
              <span>Joined {date}</span>
            </div>
          </div>
        </div>

        {isOwner && (
          <div>
            <button
              className="text-green-500 hover:text-green-600 px-4 py-2 rounded-md text-xs mt-20"
              onClick={() => setIsEditProfileModalOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {isProfilePicModalOpen && (
        <ChangeProfilePicModal
          user={user}
          setUser={setUser}
          onClose={() => setIsProfilePicModalOpen(false)}
        />
      )}

      {isEditProfileModalOpen && (
        <EditProfileModal
          user={user}
          setUser={setUser}
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
