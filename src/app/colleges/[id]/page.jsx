// app/colleges/[id]/page.js
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import {
  FaStar,
  FaCalendarAlt,
  FaTrophy,
  FaRunning,
  FaBookOpen,
  FaInfoCircle,
} from "react-icons/fa";

export default async function CollegeDetailsPage({ params }) {
  const { id } = params;
  let college = null;

  try {
    if (!ObjectId.isValid(id)) {
      notFound(); // Handle invalid ID format
    }
    const collegeCollection = await dbConnect(collectionNameObject.collegeCollection);
    const fetchedCollege = await collegeCollection.findOne({ _id: new ObjectId(id) });

    if (!fetchedCollege) {
      notFound(); // Handle college not found
    }

    // --- FIX: Convert _id to string for the single college object ---
    college = {
      ...fetchedCollege,
      _id: fetchedCollege._id.toString()
    };

  } catch (error) {
    console.error("Error fetching college details:", error);
    notFound(); // Fallback for database errors
  }

  // Ensure arrays are handled gracefully
  // Use 'college' which now has _id as string
  const events = college.events && Array.isArray(college.events) ? college.events : [];
  const sports = college.sports && Array.isArray(college.sports) ? college.sports : [];
  const researchPapers = college.researchPapers && Array.isArray(college.researchPapers) ? college.researchPapers : [];

   return (
    <>
    <div>
      <h2 className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent text-4xl md:text-5xl text-center font-bold my-6">Detail Information {college.name}</h2>
    </div>
    <div className="container mx-auto rounded-lg max-w-5xl border border-gray-300 my-4 shadow">
      <div className="bg-white rounded-lg overflow-hidden">
        <img
          src={college.image || "/default.jpg"}
          alt={college.name}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            {college.name}
          </h1>

          <div className="flex items-center text-yellow-500 text-lg mb-6 justify-center gap-2">
            <FaStar /> <span className="font-semibold">Rating: {college.rating || 'n/a'} / 5</span>
          </div>

          <div className="space-y-6 text-gray-700">
            {/* Admission Info */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-button-bg">
                <FaCalendarAlt /> Admission Info
              </h2>
              <p className="ml-6 mt-1">Admission Date: {college.admissionDates}</p>
              {college.admissionProcessDetails && (
                <p className="ml-6 mt-1">{college.admissionProcessDetails}</p>
              )}
            </div>

            {/* Events */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-button-bg">
                <FaTrophy /> Events
              </h2>
              {events.length > 0 ? (
                <ul className="ml-6 list-disc mt-1 space-y-1">
                  {events.map((event, i) => <li key={i}>{event}</li>)}
                </ul>
              ) : (
                <p className="ml-6 text-gray-500">No events listed.</p>
              )}
            </div>

            {/* Research */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-button-bg">
                <FaBookOpen /> Research Works
              </h2>
              {researchPapers.length > 0 ? (
                <ul className="ml-6 list-disc mt-1 space-y-1">
                  {researchPapers.map((paper, i) => (
                    <li key={i}>
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {paper.title || `Research Paper ${i + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ml-6 text-gray-500">No research papers listed.</p>
              )}
            </div>

            {/* Sports */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-button-bg">
                <FaRunning /> Sports
              </h2>
              {sports.length > 0 ? (
                <ul className="ml-6 list-disc mt-1 space-y-1">
                  {sports.map((sport, i) => <li key={i}>{sport}</li>)}
                </ul>
              ) : (
                <p className="ml-6 text-gray-500">No sports facilities listed.</p>
              )}
            </div>

            {/* Description */}
            {college.description && (
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2 text-button-bg">
                  <FaInfoCircle /> About {college.name}
                </h2>
                <p className="ml-6 mt-1">{college.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}