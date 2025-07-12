// app/colleges/[id]/page.js
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <img
          src={college.image || "/default.jpg"}
          alt={college.name}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{college.name}</h1>
          <p className="text-lg text-gray-700 mb-4">
            **Rating:** <span className="text-yellow-500 font-semibold">{college.rating} / 5</span>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Admission Process</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            **Admission Dates:** {college.admissionDates}
          </p>
          {college.admissionProcessDetails && (
            <div className="text-gray-700 leading-relaxed mb-4">
              <p>{college.admissionProcessDetails}</p>
            </div>
          )}

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Events</h2>
          {events.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              {events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mb-4">No events listed.</p>
          )}

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Research Works</h2>
          {researchPapers.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              {researchPapers.map((paper, index) => (
                <li key={index}>
                  <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {paper.title || `Research Paper ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mb-4">No research papers listed.</p>
          )}

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Sports Categories</h2>
          {sports.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              {sports.map((sport, index) => (
                <li key={index}>{sport}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mb-4">No sports facilities listed.</p>
          )}

          {college.description && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">About {college.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{college.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
