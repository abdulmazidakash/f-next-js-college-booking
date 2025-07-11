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

{filteredColleges.length === 0 && searchTerm !== "" && (
  <p className="mt-4 text-red-500">No colleges found for "{searchTerm}"</p>
)}


  return (
  <section className="py-6">
  
    <h2 className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent text-4xl font-bold text-center my-6">Featured College</h2>
    
    {filteredColleges.length === 0 && searchTerm !== "" && (
      <p className="mt-4 text-red-500 text-center text-2xl font-bold">
        No colleges found for "{searchTerm}"
      </p>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {(searchTerm ? filteredColleges : colleges).slice(0, 3).map((college) => (
        <CollegeCard key={college._id} college={college} />
      ))}
    </div>
  </section>
);

}
