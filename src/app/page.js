import CollegeSection from "@/components/CollegeSection";
import ImageGallery from "@/components/ImageGallery";
import ResearchLinks from "@/components/ResearchLinks";
import ReviewSection from "@/components/ReviewSection";


export default async function Home() {

  return (
    <div className="w-11/12 mx-auto">
      <CollegeSection />
      <ImageGallery />
      <ResearchLinks />
      <ReviewSection />
    </div>
  );
}