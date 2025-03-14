"use client"

import {  useState } from "react";
import { toast } from "sonner";

const EditProfileModal = ({ user, setUser, onClose }) => {
  const [name, setName] = useState(user?.name || ""); // ✅ Pre-fill name
  const [about, setAbout] = useState(user?.about || ""); // ✅ Pre-fill about
 
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, about }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }
      const updatedUser = await res.json();
      
      // ✅ Update user state in ProfilePage
      setUser((prevUser) => ({ ...prevUser, name: updatedUser.name, about: updatedUser.about }));

      // ✅ Handle success
      // console.log("Profile updated successfully");
      toast.success("Profile updated successfully");
      onClose(); // Close modal after saving
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50
   
    ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96
      h-[50%]  bg-white-500  border border-black  min-h-96
      ">
        <p className="text-md text-black mb-4 font-thin">Profile Information</p>
        {/* ✅ Name Input */}
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-md mb-3"
          placeholder="Enter your name"
        />
        {/* ✅ Username Input
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded-md mb-3"
          placeholder="Username"
        /> */}

        {/* ✅ about Input */}
        <label className="block text-sm font-medium text-gray-700">About</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full border p-2 rounded-md mb-3 min-h-32  resize-none whitespace-pre-line"
          placeholder="Tell us about yourself"
        />

        {/* ✅ Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
