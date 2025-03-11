"use client";

import React, { useRef } from "react";
import {
  Code, Image as ImageIcon, Type, List,
  ListOrdered, Quote, Link, Heading1, Heading2
} from "lucide-react";

type ToolbarProps = {
  editor: any;
  position: { top: number | null };
  isVisible: boolean;
};

const EditorToolbar = ({ editor, position, isVisible }: ToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isVisible || !editor || position.top === null) return null;

  const handleImageUpload = async (file: File) => {
    try {
      // Create a FileReader to convert the file to base64
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          // The result attribute contains the data as a base64 encoded string
          const base64String = reader.result as string;
          
          console.log("Starting upload to API...");
          
          // Call your API endpoint with the base64 data
          const response = await fetch('api/blogs/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageData: base64String }),
          });
          
          console.log("Response status:", response.status);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Upload error response:', errorText);
            
            let errorData;
            try {
              errorData = JSON.parse(errorText);
            } catch (error) {
              errorData = { error: errorText };
            }
            
            console.error('Upload error details:', errorData);
            throw new Error(`Image upload failed: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log("Upload successful, received URL:", data.url);
          
          // Insert the image URL into the editor
          editor.chain().focus().setImage({ 
            src: data.url,
            // class: 'tiptap-image' 
          }).run();
        } catch (error) {
          console.error('Error in upload request:', error);
          alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      };
      
      // Read the file as a data URL (base64)
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('Error setting up upload:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  const toolbarItems = [
    { 
      icon: <Heading1 size={18} />, 
      title: "Heading 1", 
      action: () => {
        // Apply heading level 1 with custom class
        editor.chain().focus().toggleHeading({ 
          level: 1,
          HTMLAttributes: {
            class: 'tiptap-heading-1'
          }
        }).run();
      }
    },
    { 
      icon: <Heading2 size={18} />, 
      title: "Heading 2", 
      action: () => {
        // Apply heading level 2 with custom class
        editor.chain().focus().toggleHeading({ 
          level: 2,
          HTMLAttributes: {
            class: 'tiptap-heading-2'
          }
        }).run();
      }
    },
    { 
      icon: <Type size={18} />, 
      title: "Paragraph", 
      action: () => {
        // Apply paragraph with custom class
        editor.chain().focus().setParagraph({
          HTMLAttributes: {
            class: 'tiptap-paragraph'
          }
        }).run();
      }
    },
    { 
      icon: <List size={18} />, 
      title: "Bullet List", 
      action: () => {
        // Apply bullet list with custom class
        editor.chain().focus().toggleBulletList({
          HTMLAttributes: {
            class: 'tiptap-bullet-list'
          }
        }).run();
      }
    },
    { 
      icon: <ListOrdered size={18} />, 
      title: "Numbered List", 
      action: () => {
        // Apply ordered list with custom class
        editor.chain().focus().toggleOrderedList({
          HTMLAttributes: {
            class: 'tiptap-ordered-list'
          }
        }).run();
      }
    },
    { 
      icon: <Code size={18} />, 
      title: "Code Block", 
      action: () => {
        // Apply code block with custom class
        editor.chain().focus().toggleCodeBlock({
          HTMLAttributes: {
            class: 'tiptap-code-block'
          }
        }).run();
      }
    },
    { 
      icon: <Quote size={18} />, 
      title: "Blockquote", 
      action: () => {
        // Apply blockquote with custom class
        editor.chain().focus().toggleBlockquote({
          HTMLAttributes: {
            class: 'tiptap-blockquote'
          }
        }).run();
      }
    },
    {
      icon: <ImageIcon size={18} />, 
      title: "Insert Image",
      action: () => {
        // Show file selector dialog
        fileInputRef.current?.click();
      }
    },
    {
      icon: <Link size={18} />, 
      title: "Insert Link",
      action: () => {
        const url = prompt("Enter the URL:");
        if (url) {
          // Apply link with custom class
          editor.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ 
              href: url,
              HTMLAttributes: {
                class: 'tiptap-link'
              }
            })
            .run();
        }
      }
    },
  ];

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageUpload(file);
            // Reset the input
            e.target.value = '';
          }
        }}
      />
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
            >
              {item.icon}
              <span className="text-xs mt-1">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditorToolbar;