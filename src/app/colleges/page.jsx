import CollegeCard from "@/components/CollegeCard";
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export default async function Colleges() {
  let colleges = [];
  try {
    const serviceCollection = dbConnect(collectionNameObject.collegeCollection);
    colleges = await serviceCollection.find({}).toArray();
  } catch (error) {
    console.error("college data fetch error:", error);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">All Colleges</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </div>
  );
}