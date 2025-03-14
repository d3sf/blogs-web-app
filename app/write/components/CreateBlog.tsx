"use client";

import axios from "axios";
import BlogEditor from "./BlogEditor";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState<any>(null); // Store editor content
    const [focusedField, setFocusedField] = useState<"title" | "content" | "description" | null>(null);
    const [loading, setLoading] = useState(false);
    const titleRef = useRef<HTMLTextAreaElement>(null!);
    const descriptionRef = useRef<HTMLTextAreaElement>(null!);
    const router = useRouter(); // Router for redirection

    // Adjust height dynamically as user types
    const adjustHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
        if (ref.current) {
            ref.current.style.height = "auto"; // Reset height
            ref.current.style.height = `${ref.current.scrollHeight}px`; // Set new height
        }
    };

    useEffect(() => {
        adjustHeight(titleRef);
    }, [title]);

    useEffect(() => {
        adjustHeight(descriptionRef);
    }, [description]);

    // Function to handle saving content
    const handleSave = async () => {
        if (!title.trim() || !description.trim() || !content) {
            toast.warning('Title, description, and content are required')
            return; // Prevent further execution
        }

        setLoading(true);

        try {
            const res = await axios.post("/api/blogs/create", { title, description, content });
            console.log("Blog saved:", res.data);

            // Show success alert
            toast.success("Blog Published Successfully", {
                duration: 3000,
            })
            // window.alert("Blog published successfully!");
            // Redirect to home page

            setTimeout(() => {
                router.push("/");
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error("Error saving blog:", error);
            toast.warning("Failed to save Blog, something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-7 flex justify-center ">
            <div className="flex flex-col w-full max-w-md">
                {/* Title Section */}
                <div className="relative">
                    {/* Icon Positioning of the Title */}
                    <div className="absolute left-[-50px] top-2 transition-opacity duration-200 font-serif">
                        {focusedField && <p>title</p>}
                    </div>

                    {/* Title Input (Auto-expanding) */}
                    <textarea
                        ref={titleRef}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setFocusedField("title")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full text-4xl font-bold font-serif outline-none p-3 border-b border-gray-300 resize-none overflow-hidden"
                        rows={1} // Starts with 1 row
                    />
                </div>

                {/* Description Input */}
                <div className="relative">
                    <div className="absolute left-[-100px] top-2 transition-opacity duration-200 font-serif">
                        {focusedField && <p>description</p>}
                    </div>
                    <textarea
                        ref={descriptionRef}
                        placeholder="Short description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setFocusedField("description")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full text-lg font-serif outline-none p-3 border-b border-gray-300 resize-none overflow-hidden"
                        rows={2}
                    />
                </div>

                {/* Blog Editor */}
                <div className="mt-4">
                    <BlogEditor setContent={setContent} />
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="mt-4 bg-black text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Save Blog"}
                </button>

                {/* Error Message */}
                
            </div>
        </div>
    );
};

export default CreateBlog;
