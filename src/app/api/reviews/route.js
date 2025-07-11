"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function POST(req) {
  const { text, rating, userId } = await req.json();
  const serviceCollection = dbConnect("reviewsCollection"); // Create new collection
  await serviceCollection.insertOne({ text, rating, userId, createdAt: new Date() });
  return new Response(JSON.stringify({ message: "Review submitted" }), { status: 200 });
}