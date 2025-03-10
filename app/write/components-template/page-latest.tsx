"use client";

import { use, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BlogEditor from "./components-template/BlogEditor";


const WriteBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleSaveDraft = async () => {
        try {
            const response = await axios.post("/api/blogs", {
                title,
                content,
                status: "draft",
            });

            alert("Blog saved as draft!");
            console.log(response.data);
        } catch (error) {
            console.error("Error saving draft:", error);
            alert("Failed to save draft.");
        }
    };

    const handlePublish = async () => {
        try {
            const response = await axios.post("/api/blogs/create", {
                title,
                content,
                status: "published",
            });

            alert("Blog published successfully!");
            router.push("/blogs");
            console.log(response.data);
        } catch (error) {
            console.error("Error publishing blog:", error);
            alert("Failed to publish blog.");
        }
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font87kj-bold mb-4">Write a Blog</h1>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md mb-4"
                />

                {/* <BlogEditor setContent={setContent} /> */}

                <div className="flex justify-between">
                    <button
                        onClick={handleSaveDraft}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Save as Draft
                    </button>

                    <button
                        onClick={handlePublish}
                        className="px-4 py-2 bg-customPink text-white rounded-md"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteBlog;
