"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Spinner from "../components/Spinner";
import BlogList from "../blogs/components/BlogList";
import LoadMoreButton from "../blogs/components/LoadMoreButton";

const UserBlogContainer = () => {
//   const { username } = useParams(); // Get username from URL
//   const [userId, setUserId] = useState<string | null>(null);
//   const [blogs, setBlogs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [initialLoading, setInitialLoading] = useState(true); // Track initial load

//   // Fetch user ID using username
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`/api/user/${username}`);
//         if (!res.ok) throw new Error("User not found");
//         const data = await res.json();
//         setUserId(data._id); // Store userId
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         setError("User not found");
//       }
//     };

//     fetchUser();
//   }, [username]);
  
//   // Fetch user blogs when userId is available
//   const fetchBlogs = useCallback(async () => {
//     if (!userId || !hasMore || loading) return; // Ensure userId exists

//     setLoading(true);
//     setError(null);
//     console.log("Inside page username :",userId)

//     try {
//       // const res = await fetch(`/api/blogs/user/${userId}?page=${page}&limit=10`);
//       const res = await fetch(`/api/blogs/user/${userId}?page=${page}&limit=10`);

//       if (!res.ok) throw new Error("Failed to fetch blogs");

//       const data = await res.json();
//       if (data.blogs.length === 0) {
//         setHasMore(false);
//       } else {
//         setBlogs((prev) => [
//           ...prev,
//           ...data.blogs.filter((blog) => !prev.some((b) => b._id === blog._id)), // Prevent duplicates
//         ]);
//         setPage((prev) => prev + 1);
//       }
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       setError("Failed to load blogs.");
//     }

//     setLoading(false);
//     setInitialLoading(false);
//   }, [userId, page, hasMore, loading]);

//   useEffect(() => {
//     if (userId) fetchBlogs(); // Fetch blogs once we have userId
//   }, [userId, fetchBlogs]);

//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (initialLoading) return <Spinner />;

  return (
    // <div className="max-w-2xl mx-auto">
    //   {blogs.length === 0 ? (
    //     <p className="text-center">No blogs available</p>
    //   ) : (
    //     <>
    //       {/* <BlogList blogs={blogs} />
    //       <LoadMoreButton fetchBlogs={fetchBlogs} hasMore={hasMore} loading={loading} /> */}

    //     </>
    //   )}
    // </div>
    <div>
        Hello
    </div>
  );
};

export default UserBlogContainer;
