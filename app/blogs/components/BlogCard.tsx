import Link from "next/link";

const BlogCard = ({ blog }: { blog: any }) => {
  const formattedDate = new Date(blog.createdAt)
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .replace(",", "");

  return (
    <div key={blog._id}>
      <Link href={`/blogs/${blog._id}`}>
        <h2 className="text-xl font-bold hover:text-customPink mb-2">{blog.title}</h2>
      </Link>
      <p className="text-gray-600">{blog.description}...</p>
      <p className="text-sm text-gray-500 mt-2">
        <span className="flex gap-4 mt-3 mb-8">
          <span>By {blog.author.name}</span> •
          <span className="font-mono">{formattedDate}</span>
        </span>
      </p>
    </div>
  );
};

export default BlogCard;
