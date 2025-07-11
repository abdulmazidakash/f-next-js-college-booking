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
    <div className="w-11/12 mx-auto">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CollegeSection searchTerm={searchTerm} />
      <ImageGallery />
      <ResearchLinks />
      <ReviewSection />
    </div>
  );
}