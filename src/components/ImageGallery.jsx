"use client";

export default function ImageGallery() {
  const images = [
    "https://i.ibb.co/G3vTyTj0/gallery1.jpg", // Group of graduates celebrating
    "https://i.ibb.co/Tx6Lnw28/gallery2.jpg", // Diverse group of students on campus
    "https://i.ibb.co/8gcbkrxG/gallery3.jpg", // Graduates throwing caps
    "https://i.ibb.co/v6zJBp3f/gallery4.jpg", // Students walking on campus
    "https://i.ibb.co/2TwT8P4/gallery5.jpg", // Another group of diverse graduates
    "https://i.ibb.co/Mxg4nV8n/gallery6.jpg", // Graduates with diplomas
  ];

  return (
    <section className="py-10  mt-12">
      <div className="text-center mb-8">
        {/* title  */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
          🎓 <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Graduate Group Gallery</span>
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
