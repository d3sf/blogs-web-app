const LoadMoreButton = ({ fetchBlogs, hasMore, loading }: { fetchBlogs: () => void; hasMore: boolean; loading: boolean }) => {
    if (!hasMore) return null;
  
    return (
      <button
        onClick={fetchBlogs} // ✅ Correct function reference
        className="mt-8 text-customPink text-md flex items-center gap-2"
        disabled={loading}
      >
        {loading ? "Loading..." : "Next"}
      </button>
    );
  };
  
  export default LoadMoreButton;
  