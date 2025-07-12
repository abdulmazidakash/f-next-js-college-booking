// components/ReviewSection.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { IoMdRibbon } from 'react-icons/io';

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-10 px-4 my-8 text-center">Loading reviews...</section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-10 px-4 my-8 text-center text-gray-600">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          <IoMdRibbon className="text-red-500 text-2xl" title="Awarded" />
            Student College Reviews
        </h2>
        <p>No reviews available yet. Be the first to share your experience!</p>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 w-11/12 mx-auto my-8 rounded-lg">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800">
            <span className="">💬</span> <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Student College Reviews</span>
      </h2>
      <p className="text-center max-w-2xl mx-auto text-gray-600 text-base md:text-lg mb-8">
        Read honest reviews and ratings from students who have experienced campus life, academics, and facilities firsthand.
      </p>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Keep autoplaying even on interaction
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
        className="pb-10" // Add padding to bottom for pagination dots
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={review._id || index}> {/* Use _id if available for unique key */}
            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold mb-1">{review.userName}</p>
                {review.collegeName && (
                  <p className="text-sm text-gray-500 mb-2">Reviewed for: {review.collegeName}</p>
                )}
                <p className="text-gray-700 mb-3 text-base italic">{review.text}</p>
              </div>
              <div className="text-yellow-500 text-xl flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
                ))}
                <span className="ml-2 text-gray-700 text-base">({review.rating}/5)</span>
              </div>
              {review.createdAt && (
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}