"use client";

export default function ImageGallery() {
  const images = ["/grad1.jpg", "/grad2.jpg", "/grad3.jpg"]; // Add to public/images/
  return (
    <section className="py-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Graduate Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Graduate ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>
    </section>
  );
}