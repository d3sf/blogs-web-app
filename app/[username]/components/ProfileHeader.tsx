"use client"

import { useRef, useState } from "react";
import EditProfileModal from "./EditProfileModal";

import { Calendar } from 'lucide-react';
import { formattedMonthYear } from "@/app/components/utility/formattedTime";


const ProfileHeader = ({ user, setUser }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    // const fileInputRef = useRef(null);
    const date = formattedMonthYear(user.createdAt);
    
    // const handleFileChange =async (event)=>{
    //     const file = event.target.files[0];
    //     if (!file) return;

    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file);

    //         // const response = await axios.post("/api/")
    //     } catch (error) {
            
    //     }

    // }

    return (
        <div>
            <div className="flex justify-between py-[32px] px-[12px]">
                <div className="flex gap-6">
                    <div 
                    // onMouseEnter={()=>{}}
                    // onMouseLeave={()=>{}}
                    >
                        {/* ✅ Profile Image in Circle */}
                        <img
                            src={user?.image || "/images/defaultAvatar.png"} // Use default if no image
                            alt={user?.name}
                            className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover"
                        />
                    </div>
                    <div className="mt-8">
                        <div className="text-2xl font-bold">
                            {user.name}
                            {/* {
                                name.toUpperCase()
                            } */}
                        </div>
                        <h2 className="text-gray-600 text-sm ml-1">

                            @{user.username}
                        </h2>
                        <div className="text-gray-600 text-xs border border-gray-600 rounded-full mt-2  inline-flex items-start text-[10px] px-1 ">
                            {/* {user.createdAt} */}
                            <Calendar size={14} ></Calendar>
                            <span>
                                Joined {date}
                            </span>

                            {/* convert date format later */}
                        </div>

                    </div>
                </div>
                <div>
                    <button
                        className=" text-green-500 hover:text-green-600  px-4 py-2 rounded-md text-xs mt-20"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Edit Profile
                    </button>
                    {/* ✅ Render Modal when `isModalOpen` is true */}
                    {isModalOpen && <EditProfileModal
                        user={user}
                        setUser={setUser}
                        onClose={() => setIsModalOpen(false)} />}
                </div>
            </div>

        </div>
    );
};

export default ProfileHeader;