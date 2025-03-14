"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { calculateReadTime } from "@/app/components/utility/readTime";
import { generateHTML } from "@tiptap/html";
import defaultExtensions, { StarterKit } from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import Image from "@tiptap/extension-image"; // Import Image extension
// import "../../components/ui/blogstyles.css";
// import { CustomExtensions } from "@/app/components/ui/customExtensions";

import "./blogstyles.css"
import Link from "@tiptap/extension-link";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error("Blog not found");
        }
        const data = await res.json();
        // console.log("API response :", data);
        console.log("API response :", data.blog.content);
        setBlog(data.blog);
      } catch (error) {
        setError("Blog not found");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div><Spinner /></div>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>Blog not found</p>;

  // ✅ Ensure blog.content exists before using generateHTML
  const formattedContent = blog?.content
    ? generateHTML(blog.content, [defaultExtensions,Image,StarterKit,Link])
    : "<p>No content available</p>"; // Default message if content is missing
    console.log("Generated HTML:", formattedContent);


  // ✅ Calculate read time safely
  const readTime = blog?.content ? calculateReadTime(blog.content) : 0;

  return (
    <div>
        <div className="max-w-3xl mx-auto p-6">
        <p className="text-gray-500 text-md font-mono mb-6">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <div>
          {/* {JSON.stringify(blog.description)} */}
          <p>{blog.description}</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <img
            src={blog.author.image || "/images/defaultAvatar.png"}
            alt={blog.author.name}
            className="w-12 h-12 rounded-full border border-gray-300"
          />
          <div>
            <p className="font-semibold">{blog.author.name}</p>
            <p className="text-gray-500 text-xs">{readTime} min read</p>
          </div>
        </div>

        {/* ✅ Blog Content with Full Formatting */}
        <div className="mt-6 prose lg:prose-lg blog-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formattedContent) }} />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
