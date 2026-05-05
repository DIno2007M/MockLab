import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db("Cluster0");

  const users = db.collection("users");

  // find user
  const user = await users.findOne({ email });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json({ message: "Invalid password" }, { status: 401 });
  }

  return Response.json({
    message: "Login successful",
    user: {
      name: user.name,
      email: user.email
    }
  });
}