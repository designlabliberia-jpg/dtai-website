import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const doc = await client.fetch(
      `*[_type == "article" && slug.current == $slug][0]{ _id }`,
      { slug }
    );

    if (!doc?._id) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const result = await writeClient
      .patch(doc._id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();

    return NextResponse.json({ likes: result.likes });
  } catch (err) {
    console.error("Like route error:", err);
    return NextResponse.json({ error: "Failed to like article" }, { status: 500 });
  }
}
