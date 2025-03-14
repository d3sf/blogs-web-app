"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import BlogList from "@/app/blogs/components/BlogList";
import LoadMoreButton from "@/app/blogs/components/LoadMoreButton";

const UserBlogContainer = () => {
  const { username } = useParams(); // Get username from URL
  const [userId, setUserId] = useState<string | null>(null);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true); // Track initial load

  // Fetch user ID using username
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user for:", username);
        const res = await fetch(`/api/user/${username}`);
        if (!res.ok) throw new Error("User not found");

        const data = await res.json();
        console.log("Fetched user data:", data);

        if (data?._id) {
          setUserId(data._id);
        } else {
          throw new Error("Invalid user ID");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("User not found");
      }
    };

    fetchUser();
  }, [username]);

  // Fetch user blogs when userId is available
  const fetchBlogs = useCallback(async () => {
    if (!userId) {
      console.warn("Skipping fetchBlogs: userId is missing");
      return;
    }
    if (loading || !hasMore) return; // Prevent unnecessary calls
  
    console.log("Fetching blogs for userId:", userId, "on page", page);
  
    setLoading(true);
    setError(null);
  
    try {
      const res = await fetch(`/api/blogs/user/${userId}?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
  
      const data = await res.json();
  
      if (data.blogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => [
          ...prev,
          ...data.blogs.filter((blog) => !prev.some((b) => b._id === blog._id)), // Prevent duplicates
        ]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs.");
    }
  
    setLoading(false);
    setInitialLoading(false);
  }, [userId, page, hasMore]);
  // Removed `loading` from dependencies to prevent extra re-renders

  // Reset blogs and page when userId changes
  useEffect(() => {
    if (userId) {
      setBlogs([]); // Clear blogs on user change
      setPage(1);
      setHasMore(true);
      fetchBlogs(); // Fetch blogs once userId is set
    }
  }, [userId]); // Only run when userId changes

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (initialLoading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto">
      {blogs.length === 0 ? (
        <p className="text-center">No blogs available</p>
      ) : (
        <>
          <BlogList blogs={blogs} />
          <LoadMoreButton fetchBlogs={fetchBlogs} hasMore={hasMore} loading={loading} />
        </>
      )}
    </div>
  );
};

export default UserBlogContainer;
