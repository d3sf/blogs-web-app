"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import Spinner from "./components/Spinner";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/blogs?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data = await res.json();
      if (data.blogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => {
          const newBlogs = data.blogs.filter(
            (blog) => !prev.some((b) => b._id === blog._id)
          );
          return [...prev, ...newBlogs];
        });
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs. Please try again later.");
    }

    setLoading(false);
    setInitialLoading(false);
  }, [hasMore, loading]);

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Blogs</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {initialLoading ? (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      ) : (
        <div>
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">No blogs available</p>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => {
                const formattedDate = new Date(blog.createdAt)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                  .replace(",", "");

                return (
                  <div
                    key={blog._id}
                    className="p-6 bg-white rounded-lg shadow-md"
                  >
                    <Link href={`/blogs/${blog._id}`}>
                      <h2 className="text-xl font-semibold text-gray-800 hover:text-customPink transition duration-300">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mt-2">{blog.description}...</p>
                    <div className="flex items-center text-sm text-gray-500 mt-4">
                      <Link href={`/${blog.author.username}`}>
                        <img
                          src={blog.author.image || "/images/defaultAvatar.png"}
                          alt="Author"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                      </Link>

                      {/* {JSON.stringify(blog.author)} */}
                      <Link href={`/${blog.author.username}`} className="hover:underline">
                        <span className="font-medium">{blog.author.name}</span>
                      </Link>
                      <span className="mx-2">•</span>
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {loading && blogs.length > 0 && (
            <div className="flex justify-center mt-6">
              <Spinner />
            </div>
          )}

          {!initialLoading && hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={fetchBlogs}
                className="px-4 py-2 bg-customPink text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
