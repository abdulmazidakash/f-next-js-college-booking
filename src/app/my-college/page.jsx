"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

// Import React Icons
import {
  FaUniversity,
  FaUserGraduate,
  FaImage,
  FaCalendarAlt,
  FaBookOpen, // For Subject
  FaPhone, // For Phone
  FaStar, // For Rating stars
  FaCommentAlt, // For Review section
  FaCheckCircle, // For success/confirmation
  FaEdit, // New icon for edit
  FaPaperPlane, // For link to admission
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function MyCollege() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userAdmission, setUserAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({
    _id: null, // Add _id to review state for updates
    text: "",
    rating: 0,
    collegeId: "",
    userEmail: "",
    userName: "",
    collegeName: "", // Ensure collegeName is initialized
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false); // To check if user has already reviewed

  // Fetch user admission and existing review
  useEffect(() => {
    async function fetchData() {
      if (status === 'loading') return; // Wait for session to load

      if (!session?.user?.email) {
        setLoading(false);
        // Optionally redirect if not logged in and no session email
        // router.push('/login');
        return;
      }

      try {
        // Fetch user admission
        const admissionRes = await fetch(`/api/my-admissions?email=${session.user.email}`);
        if (!admissionRes.ok) {
          throw new Error("Failed to fetch admission data");
        }
        const admissionData = await admissionRes.json();
        // Assuming userAdmission is an array and we take the first one or null
        const admission = admissionData.length > 0 ? admissionData[0] : null;
        setUserAdmission(admission);

        if (admission) {
          // Check if user has already reviewed this college
          const reviewRes = await fetch(`/api/reviews?collegeId=${admission.collegeId}&userEmail=${session.user.email}`);
          if (!reviewRes.ok) {
            throw new Error("Failed to fetch review data");
          }
          const reviewData = await reviewRes.json();
          if (reviewData.length > 0) {
            setHasReviewed(true);
            setReview(reviewData[0]); // Pre-fill review if exists, including _id and collegeName
          } else {
            setHasReviewed(false); // Ensure it's false if no review found
            setReview(prev => ({
              ...prev,
              collegeId: admission.collegeId,
              collegeName: admission.collegeName, // <--- FIX: Set collegeName here
              userEmail: session.user.email,
              userName: session.user.name || session.user.email,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.message || "Failed to load your college data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session, status]); // Depend on session and status

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    const toastId = toast.loading("Submitting review...");

    // Basic checks for collegeId and userEmail are still important.
    if (!review.collegeId || !review.userEmail || !review.collegeName) { // Added collegeName check
      toast.error("College or user email/name missing for review.", { id: toastId });
      setSubmittingReview(false);
      return;
    }

    try {
      const method = hasReviewed ? "PUT" : "POST"; // Use PUT to update, POST to create
      const url = hasReviewed ? `/api/reviews?id=${review._id}` : "/api/reviews"; // Include ID for PUT

      const reviewDataToSend = {
        text: review.text.trim(), // Trim text before sending
        rating: review.rating,
        userId: session.user.id || session.user.email, // Fallback for userId
        userName: session.user.name || session.user.email || "Anonymous", // Fallback for userName
        collegeId: review.collegeId,
        collegeName: review.collegeName, // Ensure collegeName is sent
      };

      console.log("Review data being sent:", reviewDataToSend);

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewDataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }

      toast.success(hasReviewed ? "Review updated successfully!" : "Review submitted successfully!", { id: toastId });
      setHasReviewed(true); // Ensure hasReviewed is true after successful submission/update
      // If it was a new review, update the _id in state
      if (method === "POST") {
        const responseData = await response.json();
        setReview(prev => ({ ...prev, _id: responseData.id }));
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      setSubmittingReview(false);
    }
  };

  // isFormSubmittingOrNoAdmission will disable inputs during submission or if no admission exists
  const isFormSubmittingOrNoAdmission = submittingReview || !userAdmission;

  if (loading || status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-button-bg"></span>
        <p className="ml-2 text-lg text-gray-700">Loading your college data...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-red-500 font-semibold text-xl">Please login to view your college details and add reviews.</p>
        <Link href="/login" className="mt-4 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md">
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center flex justify-center items-center gap-3 mb-10 text-gray-800">
        <FaUniversity className="text-red-500 text-4xl md:text-5xl" />
        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">My College</span>
      </h1>

      {/* Welcome & Admission Details Card */}
      <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 p-6 md:p-10 rounded-xl shadow-lg border border-gray-200 mb-8">
        <p className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <FaUserGraduate className="text-button-bg text-3xl" />
          Welcome, {session?.user?.name || session?.user?.email || "Applicant"}!
        </p>

        {userAdmission ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            {/* Image */}
            {userAdmission.image && (
              <div className="md:col-span-2 flex justify-center mb-6">
                <Image
                  src={userAdmission.image}
                  alt="Candidate Profile"
                  width={160}
                  height={160}
                  className="object-cover rounded-lg border-4 border-button-bg shadow-md"
                  priority
                />
              </div>
            )}

            {/* College Name */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaUniversity className="text-blue-500 text-xl" />
              <strong>College:</strong> {userAdmission?.collegeName}
            </div>

            {/* Subject */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaBookOpen className="text-green-500 text-xl" />
              <strong>Subject:</strong> {userAdmission?.subject}
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <MdEmail className="text-purple-500 text-xl" />
              <strong>Email:</strong> {userAdmission?.email}
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaPhone className="text-orange-500 text-xl" />
              <strong>Phone:</strong> {userAdmission?.phone}
            </div>

            {/* Address */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <MdLocationOn className="text-red-500 text-xl" />
              <strong>Address:</strong> {userAdmission?.address}
            </div>

            {/* Date of Birth */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaCalendarAlt className="text-teal-500 text-xl" />
              <strong>Date of Birth:</strong> {userAdmission?.dob}
            </div>
          </div>
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-inner">
            <p className="text-xl text-gray-700 font-medium mb-4">
              You haven't submitted an admission yet.
            </p>
            <Link href="/admission" className="inline-flex items-center bg-button-bg text-white px-6 py-3 rounded-lg font-semibold hover:bg-button-bg transition-colors duration-300 shadow-md">
              <FaPaperPlane className="mr-2" /> Go to the Admission page to apply
            </Link>
          </div>
        )}
      </div>

      {/* Review Section Card */}
      {userAdmission && (
        <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 p-6 md:p-10 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
            {hasReviewed ? (
              <FaEdit className="text-blue-500 text-3xl" /> // Changed to edit icon
            ) : (
              <FaCommentAlt className="text-button-bg text-3xl" />
            )}
            {hasReviewed ? `Edit Your Review for ${userAdmission.collegeName}` : `Add a Review for ${userAdmission.collegeName}`}
          </h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label htmlFor="reviewText" className="block text-gray-700 text-sm font-semibold mb-2">Your Review:</label>
              <textarea
                id="reviewText"
                placeholder="Share your thoughts about the college..."
                value={review.text}
                onChange={(e) => setReview({ ...review, text: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
                rows="4"
                disabled={isFormSubmittingOrNoAdmission}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Rating (1 to 5 stars):</label>
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
                        disabled={isFormSubmittingOrNoAdmission}
                      />
                      <FaStar
                        className="cursor-pointer text-3xl transition-colors duration-200"
                        color={ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isFormSubmittingOrNoAdmission || !review.text.trim() || review.rating === 0}
              className={`w-full flex items-center justify-center bg-button-bg text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md ${
                (isFormSubmittingOrNoAdmission || !review.text.trim() || review.rating === 0) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submittingReview ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span> Submitting...
                </>
              ) : hasReviewed ? (
                <>
                  <FaEdit className="mr-2" /> Update Review
                </>
              ) : (
                <>
                  <FaCommentAlt className="mr-2" /> Submit Review
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
