"use client";

import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { ChangeEvent } from "react";
import { useSession } from "next-auth/react";

const ChangeProfilePicModal = ({ user, setUser, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession(); // Get session & update function

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", "blogs/profile_pictures");

    try {
      const { data } = await axios.post("/api/uploadimage", formData);
      await axios.put("/api/user/updateimage", { image: data.url });

      setUser((prev) => ({ ...prev, image: data.url }));
      await update(); // 🔥 Refresh session so navbar updates
        window.location.reload(); // 🔥 Force full reload
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  const handleRemove = async () => {
    setLoading(true);
    try {
      await axios.put("/api/user/updateimage", { image: null });
  
      setUser((prev) => ({ ...prev, image: null }));
      await update(); // 🔥 Refresh session after removal
      window.location.reload(); // 🔥 Force full reload
    } catch (error) {
      console.error("Failed to remove image", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center relative flex flex-col items-center">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Change Profile Picture</h2>

        <label className="w-full">
          <input type="file" className="hidden" onChange={handleUpload} />
          <div className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition">
            {loading ? "Uploading..." : "Upload Image"}
          </div>
        </label>

        {user.image && (
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            onClick={handleRemove}
            disabled={loading}
          >
            {loading ? "Removing..." : "Remove Image"}
          </button>
        )}

        <button
          className="mt-4 text-gray-700 hover:text-gray-900 underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangeProfilePicModal;
