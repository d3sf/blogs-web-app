"use client";

import Image from "@tiptap/extension-image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useRef, useEffect } from "react";
import "./styles.css";
import SvgIconUse from "@/app/components/ui/SvgIconUse";
import EditorToolbar from "./EditorToolbar";
import { Link } from '@tiptap/extension-link';

const BlogEditor = ({setContent}:{setContent:(content:any)=> void}) => {
  const [buttonPosition, setButtonPosition] = useState<{ top: number | null }>({ top: null });
  const [showButton, setShowButton] = useState(false);
  const [editorClicked, setEditorClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentParagraphPos, setCurrentParagraphPos] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Ensure hydration sync
  // const [content, setContent ] = useState("");

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //@ts-expect-error
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link

    ],
    content: "<p></p>",
    immediatelyRender: false,
    onCreate: () => {
      setShowButton(false);
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON()); // Send content to parent component

      if (!editorClicked) return;
      

      updateButtonPosition(editor);

      const { selection } = editor.state;
      const { $from } = selection;
      const currentNode = $from.parent;

      const isEmpty = currentNode.type.name === "paragraph" && currentNode.content.size === 0;

      setShowButton(isEmpty);
    },
    onSelectionUpdate: ({ editor }) => {
      if (!editorClicked) return;

      updateButtonPosition(editor);

      const { selection } = editor.state;
      const { $from } = selection;
      const currentNode = $from.parent;

      // Safe way to get paragraph position
      const paragraphPos = $from.depth > 0 ? $from.before() : null;

      // Check if we've moved to a different paragraph
      if (currentParagraphPos !== null && currentParagraphPos !== paragraphPos) {
        setIsMenuOpen(false); // Reset menu state when changing paragraphs
      }

      setCurrentParagraphPos(paragraphPos);

      const isEmpty = currentNode.type.name === "paragraph" && currentNode.content.size === 0;
      setShowButton(isEmpty);
    },
    //@ts-ignore
    onKeyDown: ({ event }) => {
      // Reset menu when Enter key is pressed
      if (event.key === "Enter") {
        setIsMenuOpen(false);
      }
    },
  });

  
  const updateButtonPosition = (editor: any): void => {
    if (!editor || !editorRef.current) return;

    const { selection } = editor.state;
    const { from } = selection;
    const cursorCoords = editor.view.coordsAtPos(from);
    const editorRect = editorRef.current.getBoundingClientRect();

    setButtonPosition({ top: cursorCoords.top - editorRect.top });
  };

  // Handle focus/click events
  useEffect(() => {
    if (editor) {
      const handleFocus = () => {
        setEditorClicked(true);

        const { selection } = editor.state;
        const { $from } = selection;
        const currentNode = $from.parent;

        // Safe way to set paragraph position
        setCurrentParagraphPos($from.depth > 0 ? $from.before() : null);

        const isEmpty = currentNode.type.name === "paragraph" && currentNode.content.size === 0;

        setShowButton(isEmpty);
        updateButtonPosition(editor);
      };

      // Close menu when clicking outside
      const handleClickOutside = (event: MouseEvent) => {
        if (
          editorRef.current &&
          !editorRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest(".editor-toolbar")
        ) {
          setIsMenuOpen(false);
        }
      };

      editor.view.dom.addEventListener("focus", handleFocus);
      editor.view.dom.addEventListener("click", handleFocus);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        editor.view.dom.removeEventListener("focus", handleFocus);
        editor.view.dom.removeEventListener("click", handleFocus);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [editor]);

  // Close menu when Escape is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // **Only render when mounted to avoid SSR mismatches**
  if (!isMounted) return null;

  return (
    <div ref={editorRef} className="relative p-4 rounded-md">
      {/* Toolbar */}
      <div className="absolute left-[-20px]">
        <EditorToolbar editor={editor} position={buttonPosition} isVisible={isMenuOpen} />
      </div>

      {/* Plus Button */}
      {showButton && buttonPosition.top !== null && (
        <button
          className={`absolute left-[-40px] flex items-center justify-center text-lg 
          transition-all duration-200 ${isMenuOpen ? "rotate-45" : "rotate-0"}`}
          style={{ top: buttonPosition.top }}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <SvgIconUse />
        </button>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
};

export default BlogEditor;
