'use client';

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1B2A]">
      <SignUp
        routing="path"
        path="/sign-up"
        redirectUrl="/dashboard"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#1A2B3B] border border-gray-800",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-gray-800 border border-gray-700 hover:bg-gray-700",
            formFieldInput: "bg-gray-800 border-gray-700 text-white",
            formButtonPrimary: "bg-[#B3261E] hover:bg-[#C04A44]",
            footerActionLink: "text-[#B3261E] hover:text-[#C04A44]",
            dividerLine: "bg-gray-700",
            formFieldLabel: "text-gray-300",
          },
        }}
      />
    </div>
  );
}