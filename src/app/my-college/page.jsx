// app/my-college/page.js
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function MyCollege() {
  const { data: session, status } = useSession();
  const [userAdmission, setUserAdmission] = useState(null);
  const [review, setReview] = useState({ text: "", rating: 0, collegeId: "", collegeName: "" });
  const [loadingAdmission, setLoadingAdmission] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    async function fetchUserAdmission() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch(`/api/my-admissions?email=${session.user.email}`);
          if (!response.ok) {
            throw new Error("Failed to fetch admission details.");
          }
          const data = await response.json();
          if (data && data.length > 0) {
            setUserAdmission(data[0]);
            setReview((prev) => ({
              ...prev,
              collegeId: data[0].collegeId,
              collegeName: data[0].collegeName,
            }));
          } else {
            setUserAdmission(null);
          }
        } catch (error) {
          console.error("Error fetching user admission:", error);
          toast.error("Failed to load your admission details.");
        } finally {
          setLoadingAdmission(false);
        }
      } else if (status === "unauthenticated") {
        setLoadingAdmission(false);
      }
    }
    fetchUserAdmission();
  }, [session, status]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (status !== "authenticated" || !session?.user) {
      toast.error("You must be logged in to submit a review.");
      return;
    }
    if (!userAdmission) {
      toast.error("You need to have an admission record to submit a review.");
      return;
    }

    if (!review.text.trim() || review.rating === 0 || !review.collegeId || !review.collegeName) {
      toast.error("Please fill in all review fields and select a rating.");
      return;
    }

    setSubmittingReview(true);
    const toastId = toast.loading("Submitting review...");

    try {
      const reviewData = {
        text: review.text.trim(),
        rating: review.rating,
        userId: session.user.id || session.user.email, // Fallback for userId
        userName: session.user.name || session.user.email || "Anonymous", // Fallback for userName
        collegeId: review.collegeId,
        collegeName: review.collegeName,
      };

      console.log("Review data being sent:", reviewData); // Keep this log for debugging

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }

      toast.success("Review submitted successfully!", { id: toastId });
      setReview({ text: "", rating: 0, collegeId: userAdmission?.collegeId || "", collegeName: userAdmission?.collegeName || "" });
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      setSubmittingReview(false);
    }
  };

  const isReviewFormDisabled = submittingReview || !userAdmission || !review.text.trim() || review.rating === 0 || !review.collegeId || !review.collegeName;

  if (status === "loading" || loadingAdmission) {
    return (
      <p className="container mx-auto px-4 py-6 text-center">Loading your details...</p>
    );
  }

  if (status === "unauthenticated") {
    return (
      <p className="container mx-auto px-4 py-6 text-red-500 font-semibold">Please login to view your college details and add reviews.</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">My College</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="text-xl font-semibold mb-3">Welcome, {session?.user?.name || session?.user?.email}!</p>
        {userAdmission ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Admitted College</h2>
            <p className="text-lg text-gray-700">**College:** {userAdmission.collegeName}</p>
            <p className="text-md text-gray-600">**Subject:** {userAdmission.subject}</p>
            <p className="text-md text-gray-600">**Admission Date:** {userAdmission.dob}</p>
            {userAdmission.image && (
              <div className="mt-4">
                <p className="text-md text-gray-600">**Uploaded Image:**</p>
                <img src={userAdmission.image} alt="Candidate" className="w-32 h-32 object-cover rounded-lg mt-2 shadow-sm" />
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">You haven't submitted an admission yet. Go to the
          <Link href="/admission" className="text-blue-600 hover:underline">Admission page</Link> to apply!</p>
        )}
      </div>

      {userAdmission && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add a Review for {userAdmission.collegeName}</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <textarea
              placeholder="Share your thoughts about the college..."
              value={review.text}
              onChange={(e) => setReview({ ...review, text: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            />
            <div>
              <label className="block text-gray-700 font-medium mb-1">Rating (0-5 Stars):</label>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={ratingValue}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setReview({ ...review, rating: ratingValue })}
                        className="hidden"
                      />
                      <FaStar
                        className="cursor-pointer text-2xl transition-colors"
                        color={ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              disabled={isReviewFormDisabled}
              className={`w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors ${isReviewFormDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
