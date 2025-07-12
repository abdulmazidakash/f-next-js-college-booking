// src/app/api/my-admissions/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return new Response(JSON.stringify({ error: "Email parameter is required." }), { status: 400 });
    }

    // --- FIX: Await dbConnect here ---
    const admissionCollection = await dbConnect(collectionNameObject.admissionCollection);
    
    // Find admissions where the email matches the user's email
    const userAdmissions = await admissionCollection.find({ email: userEmail }).toArray();

    return new Response(JSON.stringify(userAdmissions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user admissions:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch admission details." }), {
      status: 500,
    });
  }
}
