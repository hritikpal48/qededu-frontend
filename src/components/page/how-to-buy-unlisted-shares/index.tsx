"use client"
import React from "react";
import Link from "next/link";
import Image from "@/components/ui/Image";
import {
  FaUserFriends,
  FaHandshake,
  FaRupeeSign,
  FaFileAlt,
  FaTruck,
} from "react-icons/fa";
import AppImages from "@/config/constant/app.images";
import { useProcessDetails } from "@/services/settings.service";
import { environmentVariables } from "@/config/app.config";
type Step = {
  icon: React.ReactNode;
  title: string;
  stepNumber: string;
  borderColor: string;
  iconBg: string;
};

const steps: Step[] = [
  {
    icon: <FaUserFriends className="text-white text-xl" />,
    title: "Connect with us",
    stepNumber: "STEP 01",
    borderColor: "border-orange-500",
    iconBg: "bg-orange-500",
  },
  {
    icon: <FaHandshake className="text-white text-xl" />,
    title: "Deal Confirmation",
    stepNumber: "STEP 02",
    borderColor: "border-pink-500",
    iconBg: "bg-pink-500",
  },
  {
    icon: <FaRupeeSign className="text-white text-xl" />,
    title: "Fund Transfer",
    stepNumber: "STEP 03",
    borderColor: "border-cyan-500",
    iconBg: "bg-cyan-500",
  },
  {
    icon: <FaFileAlt className="text-white text-xl" />,
    title: "Documentation",
    stepNumber: "STEP 04",
    borderColor: "border-indigo-500",
    iconBg: "bg-indigo-500",
  },
  {
    icon: <FaTruck className="text-white text-xl" />,
    title: "Delivery of Shares",
    stepNumber: "STEP 05",
    borderColor: "border-lime-500",
    iconBg: "bg-lime-500",
  },
];

const HowToBuyUnlistedSharesPage = () => {

    const { data, isLoading } = useProcessDetails();
  

  
  return (
    <>
      <section className="bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Left content */}
          <div className="mb-10 md:mb-0 md:w-1/2">
           <h2 className="text-4xl md:text-5xl font-bold text-black leading-snug">
            {data?.title
              ? data.title.split(" ").map((word, index) => (
                  <>
                    {word}{" "}
                    {(word.toLowerCase() === "step-by-step" || word.toLowerCase() === "buying") && <br />}
                  </>
                ))
              : (
                <>
                  Step-by-Step <br /> Process of Buying <br /> Unlisted Shares
                </>
              )}
          </h2>
          </div>

          {/* Right image */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={`${environmentVariables.UPLOAD_URL}/setting/${data?.image}`|| AppImages.process.processBg}
              alt="Buying Process Illustration"
              width={500}
              height={500}
              className="w-auto h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            PROCESS OF BUYING UNLISTED SHARES
          </h2>
          <p className="text-gray-300 text-lg mb-12 tracking-wider">
            IT'S EASIER THAN YOU THINK
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`border-2 ${step.borderColor} rounded-xl p-6 text-center flex flex-col items-center hover:scale-105 transition-transform duration-300`}
              >
                <div
                  className={`w-12 h-12 ${step.iconBg} rounded-full flex items-center justify-center mb-4`}
                >
                  {step.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <span className="text-sm text-gray-400">{step.stepNumber}</span>
              </div>
            ))}
          </div>

          {/* Line separator and brand */}
          <div className="mt-12 border-t border-gray-700 pt-6">
            <h3 className="text-2xl font-bold">UNLISTED Unlisted Edge</h3>
            <Link
              href="/"
              className="text-[#70E63D] underline text-lg mt-2 inline-block"
            >
              www.qededu.in
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto ">
          {/* Image Section */}
          <div className="w-full flex justify-center mb-10">
            <Image
            src={`${environmentVariables.UPLOAD_URL}/setting/${data?.image}`|| AppImages.process.processTerm}
              // src={AppImages.process.processTerm}
              alt="Guide Illustration"
              width={600}
              height={300}
            />
          </div>

          {/* Text Content */}
          {data?.description?(
             <div
                             className="text-base leading-relaxed text-gray-800 [&>p]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-4 [&>strong]:font-bold [&>a]:text-blue-600 [&>a]:underline"

    dangerouslySetInnerHTML={{ __html: data.description }}
  />
          ):(
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How to Buy Unlisted Shares? Step-by-Step Process of Buying
              Unlisted Shares at <span className="text-green-600">Unlisted Edge</span>
            </h2>

            <p className="text-gray-700 mb-6 text-[16px] leading-relaxed">
              At <strong>Unlisted Edge</strong>, we make investing in unlisted
              companies simple, transparent, and secure. Whether you're a
              first-time investor or an experienced market participant, our
              seamless process ensures you get access to top-quality private
              market opportunities without any hassle.
            </p>

            <ul className="space-y-5 text-gray-700 text-[16px] leading-relaxed">
              <li>
                <strong>Step 1 – Connect with Us:</strong>
                <br />
                Reach out to us through your preferred platform — WhatsApp,
                Email, Telegram, or directly via our website contact form. Let
                us know the company and the number of unlisted shares you are
                interested in.
              </li>

              <li>
                <strong>Step 2 – Deal Confirmation:</strong>
                <br />
                Based on your interest, our team will provide you with the
                latest market price and availability. Once confirmed, we’ll
                proceed with the deal and lock your requirement.
              </li>

              <li>
                <strong>Step 3 – Fund Transfer:</strong>
                <br />
                You’ll receive our bank details for payment via NEFT/IMPS/RTGS.
                In case of online platform usage, UPI or payment gateway support
                is also available.
              </li>

              <li>
                <strong>Step 4 – Documentation:</strong>
                <br />
                To initiate the transfer of shares to your demat account, we
                require the following:
                <ul className="list-disc ml-6 mt-2">
                  <li>Client Master Report (PDF/Soft Copy)</li>
                  <li>Cancelled Cheque/Bank Screenshot</li>
                  <li>PAN Card (Only for high-value transactions)</li>
                </ul>
              </li>

              <li>
                <strong>Step 5 – Share Delivery:</strong>
                <br />
                After the payment and documents are received, shares are
                transferred to your demat account within{" "}
                <strong>24 to 48 hours</strong>. We ensure secure and verified
                delivery every time.
              </li>
            </ul>

            {/* App Store Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Get the Unlisted Edge App
              </h4>
              <div className="flex flex-wrap gap-4">
                <Link href="#" className="text-green-700 underline text-sm">
                  Download on Android
                </Link>
                <Link href="#" className="text-green-700 underline text-sm">
                  Download on iOS
                </Link>
              </div>
            </div>

            {/* Extended Info */}
            <div className="mt-8 text-gray-700 text-[16px] leading-relaxed">
              <p className="mb-4">
                Still unsure how unlisted shares work? Unlisted Edge simplifies access
                to companies not listed on NSE/BSE by bridging the gap between
                investors and sellers. Our team supports you at every step —
                from inquiry to final delivery.
              </p>
              <p>
                For a smooth onboarding or any investment-related consultation,
                feel free to reach out via the{" "}
                <Link href="/contact-us" className="text-green-600 underline">
                  Contact Us
                </Link>{" "}
                section.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-10 bg-emerald-600 text-white p-6 rounded-lg flex flex-col md:flex-row justify-between items-center">
              <p className="text-lg font-semibold text-center md:text-left">
                Interested in investing in unlisted shares? Get started with{" "}
                <span className="underline">Unlisted Edge</span> today!
              </p>
              <Link
                href="contact-us"
                className="mt-4 md:mt-0 bg-white text-emerald-700 font-semibold py-2 px-5 rounded-md hover:bg-gray-100 transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          )}
         
        </div>
      </section>
    </>
  );
};

export default HowToBuyUnlistedSharesPage;
