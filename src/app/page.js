'use client'
import CollegeSection from "@/components/CollegeSection";
import ImageGallery from "@/components/ImageGallery";
import ResearchLinks from "@/components/ResearchLinks";
import ReviewSection from "@/components/ReviewSection";
import Header from "@/components/Header";
import { useState } from "react";


export default function Home() {

    const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="bg-gradient-to-b from-pink-100 via-white to-purple-100">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 ">
        <CollegeSection searchTerm={searchTerm} />
      </div>
      <div className="w-11/12 mx-auto">
        <ImageGallery />
        <ResearchLinks />
      </div>
      <div className="">
        <ReviewSection />
      </div>
    </div>
  );
}