// app/colleges/page.jsx
import CollegeCard from "@/components/CollegeCard";
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export default async function Colleges() {
  let colleges = [];
  try {
    const collegeCollection = await dbConnect(collectionNameObject.collegeCollection);
    
    // --- CRITICAL FIX: Map over the colleges to convert _id to string ---
    colleges = (await collegeCollection.find({}).toArray()).map(college => ({
      // Use spread operator to copy all existing properties
      ...college,
      // Explicitly convert the ObjectId to a string
      _id: college._id.toString() 
    }));
  } catch (error) {
    console.error("college data fetch error:", error);
    // In a real application, you might want to render an error state or a message
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">All Colleges</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          // Use the already converted _id string as key, and pass the modified college object
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </div>
  );
}
