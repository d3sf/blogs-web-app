import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageBlob = formData.get("image"); // Could be a file
    const imageUrl = formData.get("imageUrl") as string | null; // Could be a URL
    const folder = formData.get("folder") as string | null; // Folder name

    if (!folder) {
      return NextResponse.json({ error: "No folder specified" }, { status: 400 });
    }

    let uploadResponse;

    if (imageBlob && imageBlob instanceof Blob) {
      // ✅ Handle File Upload (Same as before)
      const arrayBuffer = await imageBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:${imageBlob.type};base64,${buffer.toString("base64")}`;

      uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder,
      });
    } else if (imageUrl) {
      // ✅ Handle Direct URL Upload
      uploadResponse = await cloudinary.uploader.upload(imageUrl, {
        folder,
      });
    } else {
      return NextResponse.json({ error: "No valid image provided" }, { status: 400 });
    }

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
