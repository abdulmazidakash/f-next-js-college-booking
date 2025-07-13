// app/login/components/LoginForm.jsx
"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"; // Make sure Link is imported
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

import { FaSchoolFlag } from "react-icons/fa6";

export default function LoginForm() {
  const session = useSession();
  console.log('login form use session--->', session);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    toast('submitting........')

    try {
      const response = await signIn('credentials', { email, password, callbackUrl: '/', redirect: false });

      console.log(email, password);
      console.log('response--->', response);
      if (response.ok) {
        toast.success(`Logged in successfully as ${email}`, { duration: 2000 });
        router.push('/');
        form.reset();
      } else {
        let errorMessage = 'Failed to login';
        if (response.error) {
          errorMessage = response.error;
        }
        toast.error(errorMessage);
      }

    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred during login.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg p-6 sm:p-8 bg-section-bg rounded-lg space-y-4 border border-gray-300"
    >
      <h2 className="text-xl bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-bold text-center mb-4">Login Your Account</h2>

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

      {/* NEW ADDITION: Forgot Password Link */}
      <div className="text-right text-sm hover:underline">
        <Link href="/forgot-password" className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent  font-medium">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full btn bg-button-bg mt-4 text-white hover:bg-white hover:text-black font-bold"
      >
        Sign In
      </button>

      <p className="text-center">Or Sign In with</p>
      <SocialLogin />

      <p className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-bold">
          Register
        </Link>
      </p>
            <h2 className="flex text-center justify-center items-center gap-2 text-xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-4"><FaSchoolFlag className="text-button-bg" /> College Booking</h2>
    </form>
  );
}
