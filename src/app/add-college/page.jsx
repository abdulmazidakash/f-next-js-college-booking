// app/add-college/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddCollege() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    admissionDates: "",
    researchCount: "",
    events: "",
    sports: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({
          name: "",
          image: "",
          admissionDates: "",
          researchCount: "",
          events: "",
          sports: "",
        });
        toast.success("College added successfully!");
        router.push("/colleges");
      } else {
        setMessage(`Error: ${data.error || "Failed to add college"}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error adding college:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Add New College</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Admission Dates</label>
          <input
            type="date"
            name="admissionDates"
            value={formData.admissionDates}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Research Count</label>
          <input
            type="number"
            name="researchCount"
            value={formData.researchCount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Events (comma-separated)</label>
          <input
            type="text"
            name="events"
            value={formData.events}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g., Orientation, Seminar"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sports (comma-separated)</label>
          <input
            type="text"
            name="sports"
            value={formData.sports}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g., Football, Cricket"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add College
        </button>
      </form>
    </div>
  );
}
