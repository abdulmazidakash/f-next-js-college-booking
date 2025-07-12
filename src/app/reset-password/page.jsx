// app/reset-password/page.js
"use client"; // This is a client component

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // For accessing URL params and routing
import toast from "react-hot-toast"; // For notifications
import Link from "next/link"; // For linking back to login

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Get the 'token' from the URL query string

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isValidToken, setIsValidToken] = useState(false); // State to track if token is present
  const [tokenChecked, setTokenChecked] = useState(false); // State to ensure token check is done

  useEffect(() => {
    // Check if a token is present in the URL
    if (token) {
      setIsValidToken(true); // Mark token as present (full validation happens on backend)
    } else {
      toast.error("Invalid or missing password reset token.");
      router.push('/forgot-password'); // Redirect if no token is found
    }
    setTokenChecked(true); // Mark that the token check has completed
  }, [token, router]); // Re-run effect if token or router changes

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading
    const toastId = toast.loading("Resetting password..."); // Show loading toast

    // Client-side password validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", { id: toastId });
      setLoading(false);
      return;
    }

    if (password.length < 6) { // Basic password length validation
      toast.error("Password must be at least 6 characters long.", { id: toastId });
      setLoading(false);
      return;
    }

    try {
      // Send a POST request to your new backend API route for resetting password
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }), // Send token and new password
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // If password reset was successful
        toast.success(data.message || "Your password has been reset successfully!", { id: toastId });
        router.push('/login'); // Redirect user to the login page
      } else {
        // If the server responded with an error status
        toast.error(data.error || "Failed to reset password. Please try again.", { id: toastId });
      }
    } catch (error) {
      // Catch any network or unexpected errors
      console.error("Reset password request error:", error);
      toast.error("An unexpected error occurred. Please try again.", { id: toastId });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Show a loading state while checking for the token initially
  if (!tokenChecked) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
        <p className="text-lg text-gray-700">Checking token...</p>
      </div>
    );
  }

  // If token is not valid (and checked), this component will return null,
  // and the useEffect will handle redirection.
  if (!isValidToken) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
              required
              minLength={6} // Basic HTML5 validation
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
              required
              minLength={6} // Basic HTML5 validation
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 ${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
