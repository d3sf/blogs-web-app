
// This file is used to fetch all blogs of a user by their userId

import { connectToDB } from "@/app/lib/db";
import Blog from "@/app/lib/models/blog";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        await connectToDB();
        const blogs = await Blog.find({ author: params.userId }).populate("author", "name email");

        if (!blogs.length) {
            return NextResponse.json({ error: "No blogs found for this user" }, { status: 404 });
        }

        return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}
