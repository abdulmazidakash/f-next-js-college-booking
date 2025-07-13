"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaStar, FaCalendarAlt, FaBookOpen, FaUniversity, FaFutbol, FaCalendarCheck } from "react-icons/fa";
import Image from "next/image";

export default function CollegeCard({ college }) {
  const pathname = usePathname();

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col p-2 bg-white">
      {/* Image */}
      <div className="relative w-full h-52">
        <Image
          src={college.image || "/default.jpg"}
          alt={college.name}
          fill
          className="object-cover rounded-t-lg"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <FaUniversity className="text-red-500" /> {college.name}
        </h3>

        {/* Rating */}
        {pathname === "/colleges" && (
          <p className="flex items-center text-yellow-500 text-sm mb-1">
            <FaStar className="mr-1" /> {college.rating || "N/A"} / 5
          </p>
        )}

        {/* Admission Date */}
        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Admission: {college.admissionDates}
        </p>

        {/* Research Count */}
        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
          <FaBookOpen className="text-purple-600" />
          Research: {college.researchCount} papers
        </p>

        {/* Events */}
        {college.events?.length > 0 && (
          <p className="text-sm text-gray-600 mb-1 flex items-start gap-2">
            <FaCalendarCheck className="text-green-500 mt-1" />
            <span>Events: {college.events.slice(0, 2).join(", ")}</span>
          </p>
        )}

        {/* Sports */}
        {college.sports?.length > 0 && (
          <p className="text-sm text-gray-600 mb-1 flex items-start gap-2">
            <FaFutbol className="text-orange-500 mt-1" />
            <span>Sports: {college.sports.slice(0, 3).join(", ")}</span>
          </p>
        )}

        {/* Details Button */}
        <Link href={`/colleges/${college._id}`} passHref>
          <button className="mt-4 w-full bg-button-bg  text-white py-2 rounded-lg transition-all text-sm font-semibold">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
