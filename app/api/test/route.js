import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("Cluster0");

  const collections = await db.listCollections().toArray();

  return Response.json({ collections });
}