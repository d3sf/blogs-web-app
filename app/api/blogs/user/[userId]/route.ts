
// This file is used to fetch all blogs of a user by their userId

import { connectToDB } from "@/app/lib/db";
import Blog from "@/app/lib/models/blog";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        const { userId } = await params;

        await connectToDB();
        //@ts-expect-error
        const blogs = await Blog.find({ author: userId });
        await Blog.populate(blogs, { path: "author", select: "name email" });

        if (!blogs.length) {
            return NextResponse.json({ error: "No blogs found for this user" }, { status: 404 });
        }

        return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}
