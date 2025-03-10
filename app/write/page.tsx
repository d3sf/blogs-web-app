"use client"

import { useState } from "react";
import SvgIconUse from "../components/ui/SvgIconUse";
import BlogEditor from "./components/BlogEditor";
import Toolbar from "./components/Toolbar";

const WriteBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [focusedField, setFocusedField] = useState<"title" | "content" | null>(null);

    return (
        <div className="mt-7 flex justify-center">
            <div className="w-full max-w-2xl relative">
                {/* Icon Positioning */}
                <div className="absolute left-[-40px] top-2 transition-opacity duration-200">
                    {focusedField && <SvgIconUse />}
                </div>
                <div className="flex ">
                <Toolbar></Toolbar>
                <BlogEditor></BlogEditor>
                </div>
                {/* Title Input */}
                <div className="flex items-center gap-4 mb-4 border-b border-gray-300">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setFocusedField("title")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full text-4xl font-bold font-serif outline-none"
                    />
                </div>

                {/* Content Input */}
                <div className="flex items-center gap-4 ">
                    <input
                        type="text"
                        placeholder="Share your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setFocusedField("content")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full font-serif text-lg outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default WriteBlog;
