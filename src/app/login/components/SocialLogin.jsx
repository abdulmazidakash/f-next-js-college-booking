'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

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
        className="btn bg-black text-white border-black"
      >
        {/* GitHub SVG */}
        Login with GitHub
      </button>

      {/* Google */}
      <button
        onClick={() => handleSocialLogin('google')}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        {/* Google SVG */}
        Login with Google
      </button>
    </div>
  );
}