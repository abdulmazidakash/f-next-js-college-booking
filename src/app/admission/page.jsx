// app/admission/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // Assuming react-hot-toast for notifications
import { useSession } from "next-auth/react";

export default function Admission() {
  const {data} = useSession();
  console.log('admission user--->', data);
  const [formData, setFormData] = useState({
    collegeId: "", // New field to store selected college ID
    collegeName: "", // New field to store selected college name
    name: "",
    subject: "",
    email: data?.user?.email || "", // Use session email if available
    phone: "",
    address: "",
    dob: "",
    image: null, // Change to null for file object
  });
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch colleges for the dropdown
    async function fetchColleges() {
      try {
        const response = await fetch("/api/colleges");
        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        toast.error("Failed to load colleges for admission.");
      } finally {
        setLoading(false);
      }
    }
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === "collegeSelect") {
      const selectedCollege = colleges.find(
        (college) => college._id === value
      );
      setFormData({
        ...formData,
        collegeId: value,
        collegeName: selectedCollege ? selectedCollege.name : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting admission...");

    // Create a new FormData object to send
    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) { // Exclude null image field if no file selected
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        body: dataToSend, // FormData doesn't need Content-Type header explicitly
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit admission");
      }

      toast.success("Admission submitted successfully!", { id: toastId });
      router.push("/my-college"); // Redirect to my-college route
    } catch (error) {
      console.error("Admission submission error:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">Loading colleges...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Admission Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
        {/* College Selection */}
        <label htmlFor="collegeSelect" className="block text-gray-700 font-medium">Select College:</label>
        <select
          id="collegeSelect"
          name="collegeSelect"
          value={formData.collegeId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="" disabled>Choose a college</option>
          {colleges.map((college) => (
            <option key={college._id} value={college._id}>
              {college.name}
            </option>
          ))}
        </select>

        <label htmlFor="name" className="block text-gray-700 font-medium">Candidate Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Candidate Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <label htmlFor="subject" className="block text-gray-700 font-medium">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          readOnly
          placeholder="Candidate Email"
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <label htmlFor="phone" className="block text-gray-700 font-medium">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Candidate Phone number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <label htmlFor="address" className="block text-gray-700 font-medium">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <label htmlFor="dob" className="block text-gray-700 font-medium">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <label htmlFor="image" className="block text-gray-700 font-medium">Upload Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Submitting..." : "Submit Admission"}
        </button>
      </form>
    </div>
  );
}