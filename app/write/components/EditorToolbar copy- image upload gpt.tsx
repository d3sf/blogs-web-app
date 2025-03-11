"use client";

import React, { useState } from "react";
import { 
  Code, Image as ImageIcon, Type, List, 
  ListOrdered, Quote, Link, Heading1, Heading2 
} from "lucide-react";
import ImageUpload from "@/app/components/ImageUpload";

type ToolbarProps = {
  editor: any;
  position: { top: number | null };
  isVisible: boolean;
};

const EditorToolbar = ({ editor, position, isVisible }: ToolbarProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  if (!isVisible || !editor || position.top === null) return null;

  const toolbarItems = [
    { icon: <Heading1 size={18} />, title: "Heading 1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { icon: <Heading2 size={18} />, title: "Heading 2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { icon: <Type size={18} />, title: "Paragraph", action: () => editor.chain().focus().setParagraph().run() },
    { icon: <List size={18} />, title: "Bullet List", action: () => editor.chain().focus().toggleBulletList().run() },
    { icon: <ListOrdered size={18} />, title: "Numbered List", action: () => editor.chain().focus().toggleOrderedList().run() },
    { icon: <Code size={18} />, title: "Code Block", action: () => editor.chain().focus().toggleCodeBlock().run() },
    { icon: <Quote size={18} />, title: "Blockquote", action: () => editor.chain().focus().toggleBlockquote().run() },
    { 
      icon: <ImageIcon size={18} />, title: "Insert Image", 
      action: () => {
        // Use ImageUpload component when "Insert Image" button is clicked
        setIsUploading(true);
      } 
    },
    { 
      icon: <Link size={18} />, title: "Insert Link", 
      action: () => {
        const url = prompt("Enter the URL:");
        if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      } 
    },
  ];

  const handleImageUploadSuccess = (url: string) => {
    setImageUrl(url); // Set the image URL in the state
    editor.chain().focus().setImage({ src: url, class: 'tiptap-image' }).run(); // Insert the image into the editor
    setIsUploading(false); // Stop uploading
  };

  return (
    <div
      className="absolute bg-white rounded-md shadow-lg p-2 flex flex-col gap-1 border border-gray-200 w-60 z-10"
      style={{
        top: position.top - 20,
        left: "max(-270px, -90vw)", // Ensures toolbar stays within viewport
        maxWidth: "100vw",
      }}
    >
      <div className="grid grid-cols-3 gap-1">
        {toolbarItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors"
            title={item.title}
            disabled={isUploading} // Disable buttons while uploading
          >
            {item.icon}
            <span className="text-xs mt-1">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Display the ImageUpload component when uploading */}
      {isUploading && (
        <ImageUpload onImageUpload={handleImageUploadSuccess} />
      )}
    </div>
  );
};

export default EditorToolbar;
