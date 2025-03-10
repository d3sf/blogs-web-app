"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type BlogEditorProps = {
  setContent: (html: string) => void;
};

const BlogEditor = ({ setContent }: BlogEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      if (setContent) setContent(editor.getHTML()); // ✅ Check if setContent exists
    },
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default BlogEditor;
