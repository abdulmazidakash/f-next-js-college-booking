"use client";

export default function ImageGallery() {
  const images = [
    "https://i.ibb.co/YhGnZz2/college1.jpg",
    "https://i.ibb.co/k2wWJrP/college2.jpg",
    "https://i.ibb.co/M6GcFh4/college3.jpg",
    "https://i.ibb.co/h9bNqRD/college4.jpg",
    "https://i.ibb.co/9c6dLyk/college5.jpg",
    "https://i.ibb.co/5h0mRYC/college6.jpg",
  ];

  return (
    <section className="py-10 px-4 bg-gradient-to-br from-purple-100 via-white to-pink-100 rounded-lg mt-12 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          🎓 Graduate Group Gallery
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore our vibrant moments captured from various college graduation events. Cherished memories of students with their peers and faculty.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            <img
              src={img}
              alt={`Graduate Group ${index + 1}`}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
