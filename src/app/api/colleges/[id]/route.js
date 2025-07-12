// app/api/colleges/[id]/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = params; // Get the ID from the URL parameters

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid College ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- FIX: Await dbConnect here ---
    const collegeCollection = await dbConnect(collectionNameObject.collegeCollection);
    const college = await collegeCollection.findOne({ _id: new ObjectId(id) });

    if (!college) {
      return new Response(JSON.stringify({ error: "College not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert ObjectId to string for JSON serialization
    // This is important if you plan to send the _id to the client
    college._id = college._id.toString();

    return new Response(JSON.stringify(college), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching college details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch college details" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
