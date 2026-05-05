import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {

  const client = await clientPromise;
  const db = client.db("mocklab");

  const feedbacks = await db
    .collection("feedbacks")
    .find({})
    .sort({ createdAt: -1 })
    .limit(6)
    .toArray();

  return NextResponse.json(feedbacks);
}

export async function POST(req) {

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("mocklab");

  await db.collection("feedbacks").insertOne({
    name: body.name,
    feedback: body.feedback,
    createdAt: new Date()
  });

  return NextResponse.json({ message: "Feedback saved" });
}