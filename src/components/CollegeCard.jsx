"use client";

import Link from "next/link";

export default function CollegeCard({ college }) {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
      <img
        src={college.image || "/default.jpg"}
        alt={college.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h3 className="text-xl font-semibold mt-2">{college.name}</h3>
      <p>Admission: {college.admissionDates}</p>
      <p>Events: {college.events.join(", ")}</p>
      <p>Research: {college.researchCount}</p>
      <p>Sports: {college.sports.join(", ")}</p>
      <Link href={`/colleges/${college._id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
          Details
        </button>
      </Link>
    </div>
  );
}