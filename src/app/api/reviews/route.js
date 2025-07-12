// app/api/reviews/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { text, rating, userId, userName, collegeId, collegeName } = await req.json();

    // Basic validation
    if (!text || rating === undefined || !userId || !userName || !collegeId || !collegeName) {
      return new Response(JSON.stringify({ error: "Missing required review fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const reviewCollection = dbConnect(collectionNameObject.reviewsCollection); // Use your collection name object
    const result = await reviewCollection.insertOne({
      text,
      rating: parseInt(rating), // Ensure rating is stored as a number
      userId,
      userName, // Store user name for display
      collegeId, // Store college ID
      collegeName, // Store college name
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Review submitted", id: result.insertedId }), {
      status: 201, // 201 Created
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return new Response(JSON.stringify({ error: "Failed to submit review" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const reviewCollection = dbConnect(collectionNameObject.reviewsCollection);
    const reviews = await reviewCollection.find({}).sort({ createdAt: -1 }).limit(10).toArray(); // Fetch latest 10 reviews
    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
      status: 500,
    });
  }
}