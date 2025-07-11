// src/app/api/user/route.js
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userCollection = dbConnect(collectionNameObject.usersCollection);
  const user = await userCollection.findOne({ email: session.user.email });

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  delete user.password; // don't send password
  user._id = user._id.toString();
  return NextResponse.json(user);
};

export const PATCH = async (req) => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const updateData = await req.json();

  const userCollection = dbConnect(collectionNameObject.usersCollection);
  const result = await userCollection.updateOne(
    { email: session.user.email },
    { $set: updateData }
  );

  return NextResponse.json({ success: result.modifiedCount > 0 });
};
