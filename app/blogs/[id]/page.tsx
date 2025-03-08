// app/blogs/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";


const BlogDetailsPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL

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

  if (loading) return <div><Spinner></Spinner></div>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>Blog not found</p>;

  // Calculate read time (assume 200 words per minute)
  const wordCount = blog.content.split(" ").length;
  const readTime = Math.ceil(wordCount / 200);
  console.log("Author Image URL:", blog.author.image);
  console.log("Full API Response:", blog);

  return (
  <div>
    
    <div className="max-w-3xl mx-auto p-6">
      {/* Blog Title */}
      <p className="text-gray-500 text-md font-mono mb-10">
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      
      {/* Author Section */}
      <div className="flex items-center gap-4 mt-4">
        {/* User Image (Circular) */}
       
        <img     
          
          src={blog.author.image || "../../../public/images/defaultAvatar.png"} // Use a default avatar if none exists
          alt={blog.author.name}
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          {/* Author Name */}
          <p className="font-semibold">{blog.author.name}</p>
          {/* Estimated Read Time */}
          <p className="text-gray-500 text-xs">{readTime} min read</p>
        </div>
      </div>

      {/* Blog Content */}
      <p className="mt-6">{blog.content}</p>
    </div>
    </div>
  );
};

export default BlogDetailsPage;
