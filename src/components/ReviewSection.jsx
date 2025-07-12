"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ReviewSection() {
  const reviews = [
    { name: "John", text: "Great campus!", rating: 4 },
    { name: "Emma", text: "Excellent teachers and activities.", rating: 5 },
    { name: "Raj", text: "Nice environment, loved the research labs!", rating: 5 },
    { name: "Fatima", text: "Hostel facilities are average.", rating: 3 },
    { name: "Alex", text: "Clean campus and helpful staff.", rating: 4 },
  ];

  return (
    <section className="py-10 px-4 bg-gradient-to-br from-purple-100 via-white to-pink-100 my-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🎓 Student College Reviews
      </h2>
<p className="text-center max-w-2xl mx-auto text-gray-600 text-base md:text-lg mb-8">
  Read honest reviews and ratings from students who have experienced campus life, academics, and facilities firsthand.
</p>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <p className="text-lg font-semibold mb-2">{review.name}</p>
              <p className="text-gray-700 mb-2">{review.text}</p>
              <p className="text-yellow-500 text-xl">
                {"★".repeat(review.rating)}{" "}
                {"☆".repeat(5 - review.rating)}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
