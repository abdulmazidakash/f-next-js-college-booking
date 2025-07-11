"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const collegeCollection = dbConnect(collectionNameObject.collegeCollection);
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
      rating,
      admissionDates,
      researchCount,
      events,
      sports,
    } = body;

    // Validate required fields
    if (!name || !image || !rating || !admissionDates || !researchCount) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const collegeCollection = dbConnect(collectionNameObject.collegeCollection);
    const newCollege = {
      name,
      image,
      rating: parseFloat(rating),
      admissionDates,
      researchCount: parseInt(researchCount),
      events: events ? events.split(",").map((event) => event.trim()) : [],
      sports: sports ? sports.split(",").map((sport) => sport.trim()) : [],
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