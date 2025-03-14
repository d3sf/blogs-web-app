"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import Spinner from "@/app/components/Spinner";
import LoadMoreButton from "@/app/blogs/components/LoadMoreButton";
import HorizontalLine from "@/app/components/ui/HorizontalLine";

const UserBlogs = () => {
  const { username } = useParams();
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${username}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        if (data?._id) {
          setUserId(data._id);
        } else {
          throw new Error("Invalid user ID");
        }
      } catch (err) {
        setError("User not found");
      }
    };
    fetchUser();
  }, [username]);

  const fetchBlogs = useCallback(async () => {
    if (!userId || loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blogs/user/${userId}?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      if (data.blogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => [...prev, ...data.blogs.filter((blog) => !prev.some((b) => b._id === blog._id))]);
        setPage((prev) => prev + 1);
      }
    } catch {
      setError("Failed to load blogs.");
    }
    setLoading(false);
    setInitialLoading(false);
  }, [userId, page, hasMore]);

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${blogId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch {
      alert("Failed to delete blog. Please try again.");
    }
  };

  useEffect(() => {
    if (userId) {
      setBlogs([]);
      setPage(1);
      setHasMore(true);
      fetchBlogs();
    }
  }, [userId]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (initialLoading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto">
      {blogs.length === 0 ? (
        <p className="text-center">No blogs available</p>
      ) : (
        <>
          <div className="grid gap-6">
            {blogs.map((blog) => {
              const isOwner = session?.user?.email && blog?.author?.email && session.user.email === blog.author.email;
              const formattedDate = new Date(blog.createdAt)
                .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                .replace(",", "");
              return (
                <div key={blog._id} className="relative">
                  <Link href={`/blogs/${blog._id}`}>
                    <h2 className="text-xl font-bold hover:text-customPink mb-2">{blog.title}</h2>
                  </Link>
                  <p className="text-gray-600">{blog.description}...</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="flex gap-4 mt-3 mb-8">
                        <span>By {blog?.author?.name}</span> •
                        <span className="font-mono">{formattedDate}</span>
                      </span>
                    </p>
                    {isOwner && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteBlog(blog._id);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete blog"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <HorizontalLine></HorizontalLine>
                </div>
              );
            })}
          </div>
          <LoadMoreButton fetchBlogs={fetchBlogs} hasMore={hasMore} loading={loading} />
        </>
      )}
    </div>
  );
};

export default UserBlogs;
