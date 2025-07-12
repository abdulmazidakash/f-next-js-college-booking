"use client";
import { useState, useEffect } from "react";
import CollegeCard from "./CollegeCard";

export default function CollegeSection({ searchTerm }) {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    async function fetchColleges() {
      const res = await fetch("/api/colleges");
      const data = await res.json();
      if (data && !data.error) setColleges(data);
    }
    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-11/12 mx-auto py-14 px-4 md:px-10 mt-10">
      {/* Title */}

      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
        🎓 <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Featured Colleges</span>
      </h2>
<p className="text-center max-w-3xl mx-auto text-gray-600 text-base md:text-lg mb-8">
  Discover top colleges carefully selected for their academic excellence, research contributions, vibrant student life, and sports activities.
</p>

      {/* If search returns no results */}
      {filteredColleges.length === 0 && searchTerm !== "" && (
        <div className="text-center text-red-500 text-lg md:text-2xl font-semibold mb-10">
          No colleges found for "<span className="font-bold">{searchTerm}</span>"
        </div>
      )}

      {/* College Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(searchTerm ? filteredColleges : colleges).slice(0, 3).map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </section>
  );
}
