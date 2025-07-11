"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";


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

	try{
		const response = await signIn('credentials', {email, password, callbackUrl: '/', redirect: false});

		console.log(email, password);
		console.log('response--->', response);
    if(response.ok){
      toast.success(`Logged in successfully as ${email}`, { duration: 2000 });
      router.push('/');
      form.reset();
    }else{
      toast.error('Failed to login')
    }

	}catch(error){
		// alert('authentication failed')
    console.log(error);
    toast.error('Failed to login')

	}
  };
  return (
    <form 
    onSubmit={handleSubmit} 
    className="w-full max-w-lg  p-6 sm:p-8 bg-section-bg rounded-lg shadow  space-y-4 border border-gray-300">
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
      <button className="w-full btn  bg-button-bg mt-4 text-white hover:bg-white hover:text-black font-bold">
        Sign In
      </button>
      <p className="text-center">Or Sign In with</p>
      <SocialLogin />
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/register" className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-bold">
          Register
        </Link>
      </p>
    </form>
  );
}