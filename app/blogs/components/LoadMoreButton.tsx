const LoadMoreButton = ({ fetchBlogs, hasMore, loading }: { fetchBlogs: () => void; hasMore: boolean; loading: boolean }) => {
    if (!hasMore) return null;
  
    return (
      <button
        onClick={fetchBlogs} // ✅ Correct function reference
        className="font-bold mt-8 hover:text-customPink text-xl flex items-center gap-2"
        disabled={loading}
      >
        {loading ? "Loading..." : "Read More"}
      </button>
    );
  };
  
  export default LoadMoreButton;
  