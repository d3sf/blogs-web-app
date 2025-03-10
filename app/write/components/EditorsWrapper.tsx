"use client";

import { useState } from "react";
import BlogEditor from "./BlogEditor";
import Toolbar from "./Toolbar";

const EditorWrapper = () => {
  const [content, setContent] = useState("");

  const handleSelection = (option: string) => {
    console.log("Selected:", option);
    // Logic to insert content into TipTap will go here
  };

  return (
    <div className="relative p-4 border w-full max-w-2xl mx-auto">
      <Toolbar onSelect={handleSelection} />
      <BlogEditor setContent={setContent} /> {/* Fix here */}
    </div>
  );
};

export default EditorWrapper;
