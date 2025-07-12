"use client";
import React from "react";
import { FaSearch, FaUserGraduate, FaBook } from "react-icons/fa";
import Image from "next/image";
import banner from "../../public/banner.png";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="w-11/12 mx-auto  px-4 md:px-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="w-full lg:w-1/2">
          <Image
            src={banner}
            alt="Student"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Find and Book Your Dream <br />
            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              College with Ease
            </span>
          </h2>
          <p className="text-gray-600 mb-6">
            Book your seat, submit admission info, view your college dashboard, and share your reviews!
          </p>

          <div className="flex items-center w-full max-w-xl bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search your preferred college name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 w-full outline-none"
            />
            <button
              className="bg-red-500 mr-2 px-8 text-lg py-2 hover:bg-red-600 text-white font-semibold rounded-full"
            >
              <FaSearch />
            </button>
          </div>

          <div className="flex gap-6 mt-6 pb-4">
            <div className="flex items-center gap-2 text-red-600 font-bold">
              <FaUserGraduate /> 59k+ Students
            </div>
            <div className="flex items-center gap-2 text-purple-600 font-bold">
              <FaBook /> 428+ Courses
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
