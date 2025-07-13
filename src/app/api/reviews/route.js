// app/api/reviews/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { ObjectId } from "mongodb"; // Import ObjectId for database queries

export async function POST(req) {
  try {
    const { text, rating, userId, userName, collegeId, collegeName } = await req.json();

    console.log("Backend received POST review data:", { text, rating, userId, userName, collegeId, collegeName });

    // Basic validation for required fields
    if (!text || rating === undefined || !userId || !userName || !collegeId || !collegeName) {
      console.error("Backend POST validation failed. Missing fields:", {
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

    // Check if a review already exists for this user and college (prevent duplicate POSTs for new reviews)
    const existingReview = await reviewCollection.findOne({
      userId: userId,
      collegeId: collegeId,
    });

    if (existingReview) {
      return new Response(JSON.stringify({ error: "You have already submitted a review for this college. Please edit your existing review." }), {
        status: 409, // Conflict
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await reviewCollection.insertOne({
      text,
      rating: parseInt(rating),
      userId,
      userName,
      collegeId,
      collegeName,
      createdAt: new Date(), // Use new Date() for creation timestamp
      updatedAt: new Date(), // Add an updatedAt timestamp
    });

    return new Response(JSON.stringify({ message: "Review submitted", id: result.insertedId.toString() }), { // Return string ID
      status: 201, // 201 Created
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting review on backend (POST):", error);
    return new Response(JSON.stringify({ error: "Failed to submit review" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // Get the review ID from query params

    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid review ID provided for update." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { text, rating, userId, userName, collegeId, collegeName } = await req.json(); // Destructure all fields

    console.log("Backend received PUT review data:", { id, text, rating, userId, userName, collegeId, collegeName });

    // Basic validation for required fields for update
    if (!text || rating === undefined || !userId || !userName || !collegeId || !collegeName) { // Ensure all relevant fields are present
      console.error("Backend PUT validation failed. Missing fields:", {
        text: !text,
        rating: rating === undefined,
        userId: !userId,
        userName: !userName,
        collegeId: !collegeId,
        collegeName: !collegeName,
      });
      return new Response(JSON.stringify({ error: "Missing required review fields for update" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const reviewCollection = await dbConnect(collectionNameObject.reviewsCollection);

    const result = await reviewCollection.updateOne(
      { _id: new ObjectId(id) }, // Query by the review's _id
      {
        $set: {
          text,
          rating: parseInt(rating),
          userName, // User name might also be updated if session changes (less common)
          updatedAt: new Date(), // Update timestamp
        },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Review not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Review updated successfully" }), {
      status: 200, // 200 OK for successful update
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating review on backend (PUT):", error);
    return new Response(JSON.stringify({ error: "Failed to update review" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const collegeId = url.searchParams.get("collegeId");
    const userEmail = url.searchParams.get("userEmail");

    const reviewCollection = await dbConnect(collectionNameObject.reviewsCollection);

    let query = {};
    if (collegeId) {
      query.collegeId = collegeId;
    }
    if (userEmail) {
      query.userEmail = userEmail; // Assuming userEmail is stored in the review document
    }

    // If both are provided, find a specific review (for 'My College' page)
    // If only collegeId, fetch all reviews for that college (for college details page)
    // If only userEmail, fetch all reviews by that user (for profile page)
    // If neither, fetch recent reviews (as before)
    const reviews = await reviewCollection.find(query).sort({ createdAt: -1 }).toArray(); // Removed limit(10) to fetch all for the query

    // Ensure _id is converted to string for client-side consumption
    const processedReviews = reviews.map(review => ({
      ...review,
      _id: review._id.toString()
    }));

    return new Response(JSON.stringify(processedReviews), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching reviews on backend (GET):", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
      status: 500,
    });
  }
}
