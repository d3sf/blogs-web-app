"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Toolbar from "./Toolbar";// Import the Toolbar component

type BlogEditorProps = {
  setContent: (content: string) => void;
};

export default function BlogEditor({ setContent }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "border p-2 min-h-[200px] w-full",
      },
    },
  });

  return (
    <div className="relative w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="mt-5 p-3 border rounded" />
    </div>
  );
}
