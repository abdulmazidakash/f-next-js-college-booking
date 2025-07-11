import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { ObjectId } from "mongodb"; // Import ObjectId

export default async function CollegeDetails({ params }) {
  // Use IIFE to await and handle params
  const college = await (async () => {
    let collegeData = {};
    try {
      const { id } = params; // Destructure id from params
      const serviceCollection = dbConnect(collectionNameObject.collegeCollection);
      collegeData = await serviceCollection.findOne({ _id: new ObjectId(id) });
      if (collegeData) collegeData = JSON.parse(JSON.stringify(collegeData)); // Convert BSON to JSON if needed
    } catch (error) {
      console.error("Error fetching college details:", error);
      if (error.name === "BSONError") {
        return { error: "Invalid college ID" };
      }
    }
    return collegeData;
  })();

  if (!college || college.error) {
    return <div className="container mx-auto px-4 py-6">{college?.error || "College not found"}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">{college.name || "College Not Found"}</h1>
      <img
        src={college.image || "/default.jpg"}
        alt={college.name || "College Image"}
        className="w-full h-64 object-cover rounded-lg my-4"
      />
      <p>Admission Process: {college.admissionProcess || "TBA"}</p>
      <p>Events: {college.events ? college.events.join(", ") : "No events"}</p>
      <p>Research Works: {college.researchCount || "N/A"}</p>
      <p>Sports: {college.sports ? college.sports.join(", ") : "No sports"}</p>
    </div>
  );
}