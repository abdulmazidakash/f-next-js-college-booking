// app/colleges/page.jsx
import CollegeCard from "@/components/CollegeCard";
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { FaUniversity } from "react-icons/fa";

export default async function Colleges() {
  let colleges = [];

  try {
    const collegeCollection = await dbConnect(collectionNameObject.collegeCollection);

    // Convert MongoDB ObjectId to string
    colleges = (await collegeCollection.find({}).toArray()).map(college => ({
      ...college,
      _id: college._id.toString()
    }));
  } catch (error) {
    console.error("college data fetch error:", error);
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Heading with Icon */}
      <h1 className="text-4xl md:text-5xl font-bold text-center flex justify-center items-center gap-3 mb-4 text-gray-800">
        <FaUniversity className="text-red-500" />
        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">All Listed Colleges</span>
      </h1>

      {/* Page Description */}
      <p className="text-center text-gray-600 w-8/12 mx-auto mb-10 text-base md:text-lg">
        Explore all colleges listed on our platform with detailed information. Each card includes the college name, admission date, number of research papers, available events and sports, and a details button to learn more.
      </p>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </div>
  );
}
