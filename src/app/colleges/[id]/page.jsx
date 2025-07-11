import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export default function CollegeDetails({ college }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">{college.name}</h1>
      <img
        src={college.image || "/default.jpg"}
        alt={college.name}
        className="w-full h-64 object-cover rounded-lg my-4"
      />
      <p>Admission Process: {college.admissionProcess || "TBA"}</p>
      <p>Events: {college.events.join(", ")}</p>
      <p>Research Works: {college.researchWorks || "N/A"}</p>
      <p>Sports: {college.sports.join(", ")}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const serviceCollection = dbConnect(collectionNameObject.collegeCollection);
  const college = await serviceCollection.findOne({ _id: params.id });
  return { props: { college: JSON.parse(JSON.stringify(college)) } };
}