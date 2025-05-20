'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/sign-in/');
  }, [router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1B2A]">
      <div className="text-white">Redirecting to sign in...</div>
    </div>
  );
}
