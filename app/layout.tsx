import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProviderWrapper } from '@/components/ThemeProviderWrapper';
import Navbar from '@/components/Navbar';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitcoin NetInsights",
  description: "Real-time transparency on Bitcoin's network activity",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Make the function async to allow for awaiting headers if needed
  
  return (
      <ClerkProvider 
        signInUrl="/sign-in"
        // Use the recommended property instead of the deprecated afterSignInUrl
        signInFallbackRedirectUrl="/dashboard"
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: '#f7931a',
            colorBackground: '#0D1B2A',
            colorInputBackground: '#1B263B',
            colorText: '#ffffff',
            colorTextSecondary: '#E0E0E0',
          }
        }}
      >
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProviderWrapper>
            <Navbar />
            {children}
          </ThemeProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}
