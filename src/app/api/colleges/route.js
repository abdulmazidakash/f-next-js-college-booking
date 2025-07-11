"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function GET() {
  try {
    const serviceCollection = dbConnect(collectionNameObject.collegeCollection);
    const colleges = await serviceCollection.find({}).toArray();
    return new Response(JSON.stringify(colleges), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch colleges" }), {
      status: 500,
    });
  }
}