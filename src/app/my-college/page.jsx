"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaStar, FaUniversity, FaUserGraduate, FaCalendarAlt, FaImage, FaCommentAlt } from "react-icons/fa";

export default function MyCollege() {
  const { data: session, status } = useSession();
  const [userAdmission, setUserAdmission] = useState(null);
  const [review, setReview] = useState({ text: "", rating: 0, collegeId: "", collegeName: "" });
  const [loadingAdmission, setLoadingAdmission] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  console.log('user admission data--->', userAdmission);

  useEffect(() => {
    async function fetchUserAdmission() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch(`/api/my-admissions?email=${session.user.email}`);
          if (!response.ok) throw new Error("Failed to fetch admission details.");

          const data = await response.json();
          if (data && data.length > 0) {
            setUserAdmission(data[0]);
            setReview(prev => ({
              ...prev,
              collegeId: data[0].collegeId,
              collegeName: data[0].collegeName,
            }));
          } else {
            setUserAdmission(null);
          }
        } catch (error) {
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

    if (!review.text.trim() || review.rating === 0) {
      toast.error("Please complete all review fields.");
      return;
    }

    setSubmittingReview(true);
    const toastId = toast.loading("Submitting review...");

    try {
      const reviewData = {
        text: review.text.trim(),
        rating: review.rating,
        userId: session.user.id || session.user.email,
        userName: session.user.name || "Anonymous",
        collegeId: review.collegeId,
        collegeName: review.collegeName,
      };

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) throw new Error("Review submission failed");

      toast.success("Review submitted successfully!", { id: toastId });
      setReview({ text: "", rating: 0, collegeId: userAdmission.collegeId, collegeName: userAdmission.collegeName });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setSubmittingReview(false);
    }
  };

  const isReviewFormDisabled = submittingReview || !review.text.trim() || review.rating === 0;

  if (status === "loading" || loadingAdmission) {
    return <p className="container mx-auto px-4 py-6 text-center">Loading your details...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="container mx-auto px-4 py-6 text-red-500 font-semibold text-center">Please login to view your college details and add reviews.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center flex justify-center items-center gap-3 mb-4 text-gray-800">
              <FaUniversity className="text-red-500" />
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">My College</span>
            </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FaUserGraduate className="text-button-bg" />
          Welcome, {session?.user?.name || session?.user?.email}!
        </p>

        {userAdmission ? (
          <div>
            <p className="text-lg text-gray-700 mb-1"><strong>College:</strong> {userAdmission?.collegeName}</p>
            <p className="text-md text-gray-600"><strong>Subject:</strong> {userAdmission?.subject}</p>
            <p className="text-md text-gray-600"><strong>Address:</strong> {userAdmission?.address}</p>
            <p className="text-md text-gray-600"><strong>Date of Birth:</strong> {userAdmission?.dob}</p>
            <p className="text-md text-gray-600"><strong>Email:</strong> {userAdmission?.email}</p>
            <p className="text-md text-gray-600"><strong>Phone:</strong> {userAdmission?.phone}</p>
            <p className="text-md text-gray-600 flex items-center gap-2">
              <FaCalendarAlt /> Admission Date: {userAdmission.dob}
            </p>

            {userAdmission.image && (
              <div className="mt-4">
                <p className="text-md text-gray-600 flex items-center gap-2">
                  <FaImage /> Uploaded Image:
                </p>
                <img
                  src={userAdmission.image}
                  alt="Candidate"
                  className="w-32 h-32 object-cover rounded-lg mt-2 shadow-sm"
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">
            You haven't submitted an admission yet.{" "}
            <Link href="/admission" className="text-button-bg hover:underline">
              Go to the Admission page
            </Link>{" "}
            to apply.
          </p>
        )}
      </div>

      {userAdmission && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaCommentAlt className="text-button-bg" /> Add a Review for {userAdmission.collegeName}
          </h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <textarea
              placeholder="Share your thoughts about the college..."
              value={review.text}
              onChange={(e) => setReview({ ...review, text: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg"
              rows="4"
              required
            />

            <div>
              <label className="block text-gray-700 font-medium mb-1">Rating (1 to 5 stars):</label>
              <div className="flex items-center gap-1">
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
                        className="cursor-pointer text-2xl"
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
              className={`w-full bg-button-bg text-white px-4 py-2 rounded-lg font-semibold hover:bg-button-bg transition-all ${
                isReviewFormDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
