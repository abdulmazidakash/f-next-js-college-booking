// components/CollegeCard.js
"use client";

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Image from "next/image"; // Assuming you use Next.js Image component

export default function CollegeCard({ college }) {
  // --- DEBUG LOG ---
  console.log("CollegeCard rendering for:", college.name, "ID:", college._id);
  // Expected: ID: "687106385f8cece586440a86" (a string)
  // If you see: ID: {buffer: ...} (an ObjectId) -> problem is still in app/colleges/page.jsx
  // If you see: ID: "Alias sit doloremqu" (a name) -> problem is in data or how data is fetched/processed before this component

  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow flex flex-col h-full">
      <Image // Changed to Next.js Image component for better optimization
        src={college.image || "/default.jpg"}
        alt={college.name}
        width={400} // Provide width and height for Image component
        height={250}
        className="w-full h-48 object-cover rounded-t-lg"
        priority
      />
      <div className="flex-grow pt-3 pb-2">
        <h3 className="text-xl font-semibold mb-1">{college.name}</h3>
        <div className="flex items-center text-yellow-500 mb-1">
          <FaStar className="mr-1" /> {college.rating || "N/A"}
        </div>
        <p className="text-gray-700 text-sm">Admission: {college.admissionDates}</p>
        <p className="text-gray-700 text-sm">Research: {college.researchCount} papers</p>
      </div>
      <Link href={`/colleges/${college._id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-600 transition-colors">
          Details
        </button>
      </Link>
    </div>
  );
}
