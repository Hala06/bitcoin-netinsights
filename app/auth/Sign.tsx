'use client';

import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1B2A]">
      <SignIn 
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#1A2B3B] border border-gray-800",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-gray-800 border border-gray-700 hover:bg-gray-700",
            formFieldInput: "bg-gray-800 border-gray-700 text-white",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
            footerActionLink: "text-blue-400 hover:text-blue-300",
            dividerLine: "bg-gray-700",
            formFieldLabel: "text-gray-300",
          },
        }}
      />
    </div>
  );
}
