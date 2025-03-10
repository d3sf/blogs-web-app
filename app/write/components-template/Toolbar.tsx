"use client";

import { useState } from "react";
import { Editor } from "@tiptap/react";
import { GrBold, GrUndo, GrRedo, GrBlockQuote } from "react-icons/gr";
import { MdOutlineFormatItalic, MdOutlineHorizontalRule } from "react-icons/md";
import { LuHeading1, LuHeading2, LuHeading3, LuStrikethrough } from "react-icons/lu";
import { RiText } from "react-icons/ri";
import { FaListUl, FaListOl, FaCode } from "react-icons/fa6";
import { BiCodeBlock, BiImage } from "react-icons/bi";

type ToolbarProps = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: ToolbarProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);

  const addImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="fixed mt-20 top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white flex gap-3 px-4 py-2 rounded-lg shadow-lg">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <GrBold />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <MdOutlineFormatItalic />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>
        <LuStrikethrough />
      </button>
      <button onClick={() => editor.chain().focus().toggleCode().run()}>
        <FaCode />
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()}>
        <RiText />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <LuHeading1 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <LuHeading2 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <LuHeading3 />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <FaListUl />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <FaListOl />
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <GrBlockQuote />
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <BiCodeBlock />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <MdOutlineHorizontalRule />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <GrUndo />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <GrRedo />
      </button>

      {/* Image Upload */}
      <button onClick={() => setShowImageInput(!showImageInput)}>
        <BiImage />
      </button>
      {showImageInput && (
        <div className="absolute bottom-12 left-0 bg-white p-2 rounded shadow-lg">
          <input
            type="text"
            placeholder="Enter Image URL"
            className="border p-1 text-black"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button onClick={addImage} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
            Add
          </button>
        </div>
      )}
    </div>
  );
}
