import { connectToDB } from "@/app/lib/db";
import Blog from "@/app/lib/models/blog";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/lib/models/user";

// Using async for the params extraction directly in the handler, no need to "await" params explicitly
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;  // Accessing params directly, no need to await.

        await connectToDB();
        const blog = await Blog.findById(id).populate("author", "name email image");

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ blog }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}

// Similarly for DELETE and PUT operations
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params; // Directly access id from params

        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDB();

        // Find the blog
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        // Get the logged-in user
        const user = await User.findOne({ email: session.user.email });

        // Check if the logged-in user is the author
        if (!user || blog.author.toString() !== user._id.toString()) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        // Delete the blog
        await Blog.findByIdAndDelete(id);

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params; // Directly access id from params

        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDB();

        // Find the blog
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        // Get the logged-in user
        const user = await User.findOne({ email: session.user.email });

        // Check if the logged-in user is the author
        if (!user || blog.author.toString() !== user._id.toString()) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        // Update the blog
        const { title, description, content } = await req.json();

        // update the blog fields
        blog.title = title || blog.title;
        blog.description = description || blog.description;  // Added description update
        blog.content = content || blog.content;

        await blog.save();

        return NextResponse.json({ message: "Blog updated successfully", blog }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}
