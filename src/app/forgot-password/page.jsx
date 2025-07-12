// app/forgot-password/page.js
"use client"; // This is a client component

import { useState } from "react";
import toast from "react-hot-toast"; // For notifications
import Link from "next/link"; // For linking back to login

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading
    const toastId = toast.loading("Sending reset link..."); // Show loading toast

    try {
      // Send a POST request to your new backend API route
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Send the email in the request body
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // If the request was successful (status 200)
        toast.success(data.message || "Password reset link sent to your email!", { id: toastId });
        setEmail(""); // Clear the email input field
      } else {
        // If the server responded with an error status (e.g., 400, 500)
        toast.error(data.error || "Failed to send reset link. Please try again.", { id: toastId });
      }
    } catch (error) {
      // Catch any network or unexpected errors
      console.error("Forgot password request error:", error);
      toast.error("An unexpected error occurred. Please try again.", { id: toastId });
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
