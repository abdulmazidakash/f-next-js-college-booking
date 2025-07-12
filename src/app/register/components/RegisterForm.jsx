// app/register/components/RegisterForm.jsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { registerUser } from "@/app/actions/auth/registerUser";
import SocialLogin from "@/app/login/components/SocialLogin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // Import toast

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading("Registering..."); // Show loading toast

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const university = form.university.value;
    const address = form.address.value;
    const imageFile = form.image.files[0];

    let imageBase64 = "";

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageBase64 = reader.result;
        await submitData({ name, email, password, university, address, image: imageBase64 }, form);
      };
      reader.readAsDataURL(imageFile);
    } else {
      await submitData({ name, email, password, university, address, image: "" }, form);
    }
  };

  const submitData = async (payload, form) => {
    const response = await registerUser(payload);
    console.log("register response", response);
    setIsSubmitting(false);

    if (response?.acknowledged === true) {
      toast.success("Registration successful!", { id: toast.loading }); // Update loading toast to success
      router.push('/');
      form.reset();
    } else {
      toast.error(response?.message || "Registration failed", { id: toast.loading }); // Update loading toast to error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg  p-6 sm:p-8 bg-section-bg rounded-lg shadow  space-y-4 border border-gray-300"
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
        className="w-full btn  bg-button-bg mt-4 text-white hover:bg-white hover:text-black font-bold"
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
