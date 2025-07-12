// components/CollegeCard.js
"use client";

import Link from "next/link";
import { FaStar } from "react-icons/fa"; // Assuming you have react-icons installed

export default function CollegeCard({ college }) {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow flex flex-col h-full">
      <img
        src={college.image || "/default.jpg"}
        alt={college.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="flex-grow pt-3 pb-2"> {/* Added flex-grow for consistent height */}
        <h3 className="text-xl font-semibold mb-1">{college.name}</h3>
        <div className="flex items-center text-yellow-500 mb-1">
          <FaStar className="mr-1" /> {college.rating || "N/A"}
        </div>
        <p className="text-gray-700 text-sm">Admission: {college.admissionDates}</p>
        <p className="text-gray-700 text-sm">Research: {college.researchCount} papers</p>
        {/* Events and Sports can be shown on details page, but basic info can be here */}
        {/* <p className="text-gray-700 text-sm">Events: {college.events.join(", ")}</p> */}
        {/* <p className="text-gray-700 text-sm">Sports: {college.sports.join(", ")}</p> */}
      </div>
      <Link href={`/colleges/${college._id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-600 transition-colors">
          Details
        </button>
      </Link>
    </div>
  );
}