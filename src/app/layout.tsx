import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import HomeLayout from "@/components/layouts/homelayout/HomeLayout";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qed Edu",
  description: "unlisted share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 


{
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        {/* <Suspense fallback={<div>Loading sidebar...</div>}> */}
          <ReactQueryProvider>
            <HomeLayout>
              {children}
            </HomeLayout>
          </ReactQueryProvider>
        {/* </Suspense> */}
      </body>
    </html>
  );
}
