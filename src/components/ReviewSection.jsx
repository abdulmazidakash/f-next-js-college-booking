"use client";

export default function ReviewSection() {
  const reviews = [{ name: "John", text: "Great campus!", rating: 4 }];
  return (
    <section className="py-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">College Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <p className="font-semibold">{review.name}</p>
            <p>{review.text}</p>
            <p>Rating: {"★".repeat(review.rating)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}