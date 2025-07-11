import CollegeSection from "@/components/CollegeSection";
import ImageGallery from "@/components/ImageGallery";
import ResearchLinks from "@/components/ResearchLinks";
import ReviewSection from "@/components/ReviewSection";
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export default function Home({ colleges }) {
  return (
    <div className="w-11/12 mx-auto">
      <CollegeSection colleges={colleges} />
      <ImageGallery />
      <ResearchLinks />
      <ReviewSection />
    </div>
  );
}

export async function getServerSideProps() {
  const serviceCollection = dbConnect(collectionNameObject.collegeCollection);
  const colleges = await serviceCollection.find({}).toArray();
  return { props: { colleges: JSON.parse(JSON.stringify(colleges)) } };
}