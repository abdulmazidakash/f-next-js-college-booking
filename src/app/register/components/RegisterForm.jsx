"use client";
import Link from "next/link";
import { registerUser } from "@/app/actions/auth/registerUser";
import SocialLogin from "@/app/login/components/SocialLogin";

export default function RegisterForm() {
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const payload = { name, email, password };
    
    const response = await registerUser(payload);
	console.log('register response', response);
    
    if (response.acknowledged === true) {
      alert("Registration successful! ✅", { position: "top-center" });
      form.reset(); // Clear the form
    } else {
      alert(response.message || "Registration failed ❌", { position: "top-center" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-section-bg rounded-lg shadow p-4 space-y-4 border border-gray-300">
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold my-2">Name</span>
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          className="input input-bordered w-full"
          name="name"
          required
        />
      </label>

      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold my-2">Email</span>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          required
        />
      </label>

      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold my-2">Password</span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
          required
        />
      </label>

      {/* <button type="submit" className="w-full h-12 bg-orange-500 text-white font-bold">
       
      </button> */}
	  <button className="w-full btn  bg-button-bg mt-4 text-white hover:bg-white hover:text-black font-bold"> Sign Up</button>

      <p className="text-center">Or Sign In with</p>
      <SocialLogin />
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-bold">
          Login
        </Link>
      </p>
    </form>
  );
}