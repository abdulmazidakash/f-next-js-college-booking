// app/api/colleges/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function GET() {
  try {
    // Await the dbConnect call
    const collegeCollection = await dbConnect(collectionNameObject.collegeCollection);
    const colleges = await collegeCollection.find({}).toArray();
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

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      image,
      admissionDates,
      researchCount,
      events,
      sports,
    } = body;

    // Validate required fields
    if (!name || !image || !admissionDates || !researchCount) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    // Await the dbConnect call
    const collegeCollection = await dbConnect(collectionNameObject.collegeCollection);
    const newCollege = {
      name,
      image,
      admissionDates,
      researchCount: parseInt(researchCount),
      events: events ? events.split(",").map((event) => event.trim()) : [],
      sports: sports ? sports.split(",").map((sport) => sport.trim()) : [],
      createdAt: new Date(), // It's good practice to add a creation timestamp
    };

    const result = await collegeCollection.insertOne(newCollege);

    return new Response(JSON.stringify({ message: "College added", id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding college:", error);
    return new Response(JSON.stringify({ error: "Failed to add college" }), {
      status: 500,
    });
  }
}
