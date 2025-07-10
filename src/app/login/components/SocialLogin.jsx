'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const router = useRouter();
  const session = useSession();

  const handleSocialLogin = (providerName) => {
      signIn(providerName)
  };

  useEffect(()=>{
	if(session?.status === 'authenticated'){
		router.push('/');
		toast.success(`Logged in successfully as ${session?.data?.user?.email}`, { duration: 2000 });
	}
  }, [session?.status])

  return (
    <div className="flex gap-4 items-center justify-center">
      {/* GitHub */}
      <button
        onClick={() => handleSocialLogin('github')}
        className="btn text-2xl rounded-full p-2 shadow"
      >
        {/* GitHub SVG */}
        <FaGithub />
      </button>

      {/* Google */}
      <button
        onClick={() => handleSocialLogin('google')}
        className="btn text-2xl rounded-full p-2 shadow"
      >
        {/* Google SVG */}
        <FcGoogle />
      </button>
    </div>
  );
}