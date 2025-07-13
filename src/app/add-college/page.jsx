// app/add-college/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// Import React Icons
import {
  FaUniversity,
  FaImage,
  FaCalendarAlt,
  FaFlask, // For Research Count
  FaCalendarCheck, // Corrected: Using FaCalendarCheck for Events
  FaRunning, // For Sports
  FaPlusCircle, // For Add College button
} from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md"; // For Research Count (alternative)

export default function AddCollege() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    image: null, // Change to null for file object
    admissionDates: "",
    researchCount: "",
    events: "",
    sports: "",
  });
  const [submitting, setSubmitting] = useState(false); // New state for submission loading

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] })); // Store the file object
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const toastId = toast.loading("Adding college...");

    // Basic client-side validation
    if (!formData.name || !formData.image || !formData.admissionDates || !formData.researchCount) {
      toast.error("Please fill in all required fields (Name, Image, Admission Dates, Research Count).", { id: toastId });
      setSubmitting(false);
      return;
    }

    // Create FormData object to send file
    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) { // Append non-null values
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("/api/colleges", {
        method: "POST",
        body: dataToSend, // FormData does not need 'Content-Type' header
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({ // Reset form after successful submission
          name: "",
          image: null,
          admissionDates: "",
          researchCount: "",
          events: "",
          sports: "",
        });
        toast.success("College added successfully!", { id: toastId });
        router.push("/colleges");
      } else {
        toast.error(`Error: ${data.error || "Failed to add college"}`, { id: toastId });
        console.error("Error adding college:", data.error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { id: toastId });
      console.error("Error adding college:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Add New College
        </span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-white via-purple-50 to-pink-50 p-8 md:p-10 rounded-xl shadow-lg border border-gray-300">

        {/* College Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaUniversity className="inline-block mr-2 text-button-bg" /> College Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g., University of Technology"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            required
            disabled={submitting}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaImage className="inline-block mr-2 text-button-bg" /> Upload Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-button-bg hover:file:bg-red-100 transition duration-200"
            required
            disabled={submitting}
          />
        </div>

        {/* Admission Dates */}
        <div>
          <label htmlFor="admissionDates" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaCalendarAlt className="inline-block mr-2 text-button-bg" /> Admission Dates:
          </label>
          <input
            type="date"
            id="admissionDates"
            name="admissionDates"
            value={formData.admissionDates}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            required
            disabled={submitting}
          />
        </div>

        {/* Research Count */}
        <div>
          <label htmlFor="researchCount" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaFlask className="inline-block mr-2 text-button-bg" /> Research Count:
          </label>
          <input
            type="number"
            id="researchCount"
            name="researchCount"
            placeholder="Number of research papers"
            value={formData.researchCount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            min="0"
            required
            disabled={submitting}
          />
        </div>

        {/* Events */}
        <div>
          <label htmlFor="events" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaCalendarCheck className="inline-block mr-2 text-button-bg" /> Events (comma-separated):
          </label>
          <input
            type="text"
            id="events"
            name="events"
            placeholder="e.g., Annual Tech Fest, Innovation Summit"
            value={formData.events}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            disabled={submitting}
          />
        </div>

        {/* Sports */}
        <div>
          <label htmlFor="sports" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaRunning className="inline-block mr-2 text-button-bg" /> Sports (comma-separated):
          </label>
          <input
            type="text"
            id="sports"
            name="sports"
            placeholder="e.g., Basketball, Soccer, Swimming"
            value={formData.sports}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            disabled={submitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full flex items-center justify-center bg-button-bg text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span> Adding College...
            </>
          ) : (
            <>
              <FaPlusCircle className="mr-2" /> Add College
            </>
          )}
        </button>
      </form>
    </div>
  );
}
