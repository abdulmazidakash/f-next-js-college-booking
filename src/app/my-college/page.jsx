"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyCollege() {
  const { data: session } = useSession();
  const [review, setReview] = useState({ text: "", rating: 0 });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...review, userId: session.user.id }),
    });
    setReview({ text: "", rating: 0 });
  };

  if (!session)
    return (
      <p className="container mx-auto px-4 py-6">Please login to view your college details.</p>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">My College</h1>
      <p>Welcome, {session.user.name}!</p>
      <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4">
        <textarea
          placeholder="Write a review"
          value={review.text}
          onChange={(e) => setReview({ ...review, text: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="number"
          min="0"
          max="5"
          placeholder="Rating (0-5)"
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}