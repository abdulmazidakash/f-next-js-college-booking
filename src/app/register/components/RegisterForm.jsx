// app/register/components/RegisterForm.jsx
"use client";
import Link from "next/link";
import { useState } from "react";
// registerUser will now expect FormData
import { registerUser } from "@/app/actions/auth/registerUser";
import SocialLogin from "@/app/login/components/SocialLogin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const currentToastId = toast.loading("Registering..."); // Capture the ID of the loading toast

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const university = form.university.value;
    const address = form.address.value;
    const imageFile = form.image.files[0]; // Get the File object directly

    // Create FormData object to send all fields, including the file
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password); // Send plain password for hashing on server
    formDataToSend.append("university", university);
    formDataToSend.append("address", address);
    if (imageFile) {
      formDataToSend.append("image", imageFile); // Append the File object
    } else {
      formDataToSend.append("image", ""); // Send empty string if no image
    }

    // Call submitData with FormData
    await submitData(formDataToSend, form, currentToastId);
  };

  // submitData now expects FormData as payload
  const submitData = async (formDataToSend, form, toastId) => {
    // We need to extract email and plain password from formDataToSend for the signIn call later
    const email = formDataToSend.get("email");
    const password = formDataToSend.get("password");

    const response = await registerUser(formDataToSend); // Pass FormData directly
    console.log("registerUser response:", response);
    setIsSubmitting(false);

    if (response?.acknowledged === true) {
      // After successful registration, immediately attempt to sign in the user
      const signInResponse = await signIn('credentials', {
        email: email,
        password: password, // Use the plain text password for signIn
        redirect: false,
      });

      console.log("signInResponse after registration attempt:", signInResponse);

      if (signInResponse?.ok) {
        toast.success("Registration successful! You are now logged in.", { id: toastId });
        router.push('/');
        form.reset();
      } else {
        toast.error(signInResponse?.error || "Registration successful, but failed to log in automatically. Please try logging in.", { id: toastId });
        router.push('/login');
        form.reset();
      }
    } else {
      toast.error(response?.message || "Registration failed", { id: toastId });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg p-6 sm:p-8 bg-section-bg rounded-lg shadow space-y-4 border border-gray-300"
    >
      <h2 className="text-xl bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-bold text-center mb-4">Create Your Account</h2>

      {/* Name */}
      <label className="form-control w-full">
        <span className="label-text font-medium mb-1">Name</span>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="input input-bordered w-full"
          required
        />
      </label>

      {/* Email */}
      <label className="form-control w-full">
        <span className="label-text font-medium mb-1">Email</span>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          required
        />
      </label>

      {/* Password */}
      <label className="form-control w-full">
        <span className="label-text font-medium mb-1">Password</span>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
          required
        />
      </label>

      {/* University */}
      <label className="form-control w-full">
        <span className="label-text font-medium mb-1">University</span>
        <input
          type="text"
          name="university"
          placeholder="Enter your university"
          className="input input-bordered w-full"
          required
        />
      </label>

      {/* Address */}
      <label className="form-control w-full">
        <span className="label-text font-medium mb-1">Address</span>
        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          className="input input-bordered w-full"
          required
        />
      </label>

      {/* Image Upload */}
      <label className="form-control w-full">
        <span className="label-text font-medium mb-1">Profile Image</span>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn bg-button-bg mt-4 text-white hover:bg-white hover:text-black font-bold"
      >
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Social Login */}
      <p className="text-center text-sm mt-3">Or Sign Up with</p>
      <SocialLogin />

      {/* Already have account */}
      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-bold"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
