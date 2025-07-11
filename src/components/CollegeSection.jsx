"use client";

import { useState } from "react";
import CollegeCard from "./CollegeCard";

export default function CollegeSection({ colleges }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by college name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/2 lg:w-1/3"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.slice(0, 3).map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </section>
  );
}