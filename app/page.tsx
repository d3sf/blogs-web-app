"use client"
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
          const newBlogs = data.blogs.filter((blog) => !prev.some((b) => b._id === blog._id));
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 flex justify-center"></h1>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show Spinner for Initial Load */}
      {initialLoading ? (
        <Spinner />
      ) : (
        <div className="max-w-2xl mx-auto">
          {/* Display Blogs */}
          {blogs.length === 0 ? (
            <p className="text-center">No blogs available</p>
          ) : (
            <div className="grid gap-6">
              {blogs.map((blog) => {
                const formattedDate = new Date(blog.createdAt)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                  .replace(",", "");

                return (
                  <div key={blog._id}>
                    <Link href={`/blogs/${blog._id}`}>
                      <h2 className="text-xl font-bold hover:text-customPink mb-2">{blog.title}</h2>
                    </Link>
                    <p className="text-gray-600">{blog.description}...</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <div className="flex items-start gap-2 mt-3 mb-8">

                        <img src={blog.author.image || '/images/defaultAvatar.png'} alt=""
                          className=" rounded-full h-5"
                        ></img>
                        <span className="font-sans">{blog.author.name}</span> •
                        <span className="font-sans">{formattedDate}</span>
                      </div>
                    </div>
                    <hr className="border-t border-gray-300" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Loading Spinner */}
          {loading && blogs.length > 0 && <Spinner />}

          {/* Load More Button */}
          {!initialLoading && hasMore && (
            <button
              onClick={fetchBlogs}
              className=" mt-8 text-customPink text-md flex items-center gap-2"
              disabled={loading}
            >
              Read More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
