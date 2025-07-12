// app/api/my-admissions/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email"); // Get user email from query param

    if (!userEmail) {
      return new Response(JSON.stringify({ error: "User email is required" }), { status: 400 });
    }

    const admissionCollection = dbConnect(collectionNameObject.admissionCollection);
    // Find admissions where the email matches the user's email
    const userAdmissions = await admissionCollection.find({ email: userEmail }).toArray();

    return new Response(JSON.stringify(userAdmissions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user admissions:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch user admissions" }), {
      status: 500,
    });
  }
}