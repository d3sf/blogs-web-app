"use client"

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner"; // Import Sonner

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  const pathname = usePathname();
  const hideNavbar = pathname === "/signin" || pathname === "/signup";


  return (
    <html lang="en">
      <body   className=""  >
     
      <SessionProvider>
      {!hideNavbar && <Navbar />} 
      <Toaster position="bottom-center"></Toaster>
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}
