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
      <div className="bg-gradient-to-r from-pink-100 via-white to-purple-100">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="w-11/12 mx-auto">

      <CollegeSection searchTerm={searchTerm} />
      <ImageGallery />
      <ResearchLinks />
      <ReviewSection />
    </div>
    </div>
  );
}