"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

// Import React Icons
import {
  FaUser,
  FaBook,
  FaPhone,
  FaCalendarAlt,
  FaPaperPlane,
  FaUniversity,
  FaImage,
  FaArrowLeft, // New icon for back button
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function Admission() {
  const { data: session } = useSession();
  console.log('admission user--->', session);

  const [selectedCollege, setSelectedCollege] = useState(null); // State to hold the selected college object
  const [formData, setFormData] = useState({
    collegeId: "",
    collegeName: "",
    name: "",
    subject: "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    dob: "",
    image: null,
  });
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch colleges for the list
    async function fetchColleges() {
      try {
        const response = await fetch("/api/colleges");
        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }
        const data = await response.json();
        // Ensure _id is string for client components if not already done by API
        const processedColleges = data.map(college => ({
          ...college,
          _id: college._id.toString(),
        }));
        setColleges(processedColleges);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        toast.error("Failed to load colleges for admission.");
      } finally {
        setLoading(false);
      }
    }
    fetchColleges();
  }, []);

  // Update email if session changes (e.g., user logs in after page load)
  useEffect(() => {
    if (session?.user?.email && formData.email === "") {
      setFormData(prev => ({ ...prev, email: session.user.email }));
    }
  }, [session, formData.email]);

  // Handle college selection from the list
  const handleSelectCollege = (college) => {
    setSelectedCollege(college);
    setFormData(prev => ({
      ...prev,
      collegeId: college._id,
      collegeName: college.name,
      // Pre-fill email if available from session
      email: session?.user?.email || prev.email,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const toastId = toast.loading("Submitting admission...");

    // Basic validation
    if (!formData.collegeId || !formData.name || !formData.subject || !formData.email || !formData.phone || !formData.address || !formData.dob) {
      toast.error("Please fill in all required fields.", { id: toastId });
      setSubmitting(false);
      return;
    }

    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        body: dataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit admission");
      }

      toast.success("Admission submitted successfully!", { id: toastId });
      router.push("/my-college");
    } catch (error) {
      console.error("Admission submission error:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-button-bg"></span>
        <p className="ml-2 text-lg text-gray-700">Loading colleges...</p>
      </div>
    );
  }

  // --- Conditional Rendering ---
  if (!selectedCollege) {
    // Show college list
    return (
      <div className="w-11/12 mx-auto my-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Select a College for Admission
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div
              key={college._id}
              className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <img
                src={college.image || "/default.jpg"}
                alt={college.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-button-bg"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{college.name}</h2>
              <p className="text-gray-600 mb-4">Rating: {college.rating || '0'} / 5</p>
              <button
                onClick={() => handleSelectCollege(college)}
                className="bg-button-bg text-white px-6 py-2 rounded-lg font-semibold hover:bg-button-bg transition-colors duration-200 shadow-md"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show admission form
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Admission Form for {selectedCollege.name}
        </span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-white via-purple-50 to-pink-50 p-8 md:p-10 rounded-xl shadow-lg border border-gray-200">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => setSelectedCollege(null)} // Go back to college list
          className="flex items-center text-button-bg hover:text-button-bg transition-colors cursor-pointer duration-200 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Colleges
        </button>

        {/* College Name (Read-only as it's selected) */}
        <div>
          <label htmlFor="collegeName" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaUniversity className="inline-block mr-2 text-button-bg" /> Selected College:
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Candidate Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaUser className="inline-block mr-2 text-button-bg" /> Candidate Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaBook className="inline-block mr-2 text-button-bg" /> Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="e.g., Computer Science, Biology"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            <MdEmail className="inline-block mr-2 text-button-bg" /> Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            readOnly
            placeholder="Your email address"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaPhone className="inline-block mr-2 text-button-bg" /> Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="e.g., +1234567890"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-gray-700 text-sm font-semibold mb-2">
            <MdLocationOn className="inline-block mr-2 text-button-bg" /> Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Your current address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-gray-700 text-sm font-semibold mb-2">
            <FaCalendarAlt className="inline-block mr-2 text-button-bg" /> Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-button-bg focus:border-button-bg transition duration-200"
            required
          />
        </div>

        {/* Upload Image */}
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
            className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-button-bg hover:file:bg-blue-100 transition duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || loading}
          className={`w-full flex items-center justify-center bg-button-bg text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md ${
            submitting || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span> Submitting...
            </>
          ) : (
            <>
              <FaPaperPlane className="mr-2" /> Submit Admission
            </>
          )}
        </button>
      </form>
    </div>
  );
}
