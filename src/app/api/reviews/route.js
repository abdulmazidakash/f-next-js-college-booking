// app/api/reviews/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { text, rating, userId, userName, collegeId, collegeName } = await req.json();

    console.log("Backend received review data:", { text, rating, userId, userName, collegeId, collegeName });

    if (!text || rating === undefined || !userId || !userName || !collegeId || !collegeName) {
      console.error("Backend validation failed. Missing fields:", {
        text: !text,
        rating: rating === undefined,
        userId: !userId,
        userName: !userName,
        collegeId: !collegeId,
        collegeName: !collegeName,
      });
      return new Response(JSON.stringify({ error: "Missing required review fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const reviewCollection = await dbConnect(collectionNameObject.reviewsCollection);
    const result = await reviewCollection.insertOne({
      text,
      rating: parseInt(rating),
      userId,
      userName,
      collegeId,
      collegeName,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Review submitted", id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting review on backend:", error);
    return new Response(JSON.stringify({ error: "Failed to submit review" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const reviewCollection = await dbConnect(collectionNameObject.reviewsCollection);
    const reviews = await reviewCollection.find({}).sort({ createdAt: -1 }).limit(10).toArray();
    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching reviews on backend:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
      status: 500,
    });
  }
}
