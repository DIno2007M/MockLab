import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db("Cluster0");

  const users = db.collection("users");

  // check if user already exists
  const existingUser = await users.findOne({ email });

  if (existingUser) {
    return Response.json({ message: "User already exists" }, { status: 400 });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save user
  await users.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  return Response.json({ message: "User created successfully" });
}