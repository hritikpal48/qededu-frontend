"use client";
import { useFetchInvResources } from "@/services/settings.service";
import React, { useState } from "react";

interface Broker {
  name: string;
  content: React.ReactNode;
}

const brokers: Broker[] = [
  {
    name: "Zerodha",
    content: (
      <div className="space-y-2">
        <p>
          To download your <strong>CMR from Zerodha</strong>:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            Login to <strong>Zerodha Console</strong>
          </li>
          <li>
            Go to <strong>Account</strong> section
          </li>
          <li>
            Click on <strong>Documents</strong>
          </li>
          <li>
            Select <strong>Download CMR</strong>
          </li>
        </ul>
        <p>The CMR will be downloaded as a PDF with your demat details.</p>
      </div>
    ),
  },
  {
    name: "Upstox",
    content: (
      <div className="space-y-2">
        <p className="font-semibold">Steps to download CMR from Upstox:</p>
        <ul className="list-decimal list-inside space-y-1 text-gray-700">
          <li>Login to the Upstox app</li>
          <li>
            Tap <strong>Account</strong> at the bottom
          </li>
          <li>
            Go to <strong>My Account</strong> &gt; <strong>Profile</strong>
          </li>
          <li>
            Select <strong>Documents</strong> &gt; <strong>CMR</strong>
          </li>
          <li>
            Tap on <strong>Get via Email</strong>
          </li>
        </ul>
        <p className="text-sm text-gray-600">
          Your CMR will be sent to your registered email within a few minutes.
        </p>
        <a
          href="https://support.upstox.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-green-600 underline mt-2"
        >
          Learn more on Upstox Support
        </a>
      </div>
    ),
  },
  {
    name: "Groww",
    content: (
      <div className="space-y-2">
        <p className="font-semibold">To get your CMR from Groww:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Open the Groww app</li>
          <li>
            Navigate to <strong>Profile</strong>
          </li>
          <li>
            Select <strong>Documents</strong>
          </li>
          <li>
            Click on <strong>Download CMR</strong>
          </li>
        </ul>
        <p>It will be saved on your device or emailed to you.</p>
      </div>
    ),
  },
  {
    name: "HDFC Securities",
    content: (
      <div className="space-y-2">
        <p>To get your CMR from HDFC Securities:</p>
        <p>
          Simply <strong>call or email</strong> HDFC Securities customer support
          with your request. They will verify your details and email your Client
          Master Report.
        </p>
        <p className="text-sm text-gray-600 italic">
          Note: Delivery usually takes 1–2 working days.
        </p>
      </div>
    ),
  },
  {
    name: "ICICI Securities/ICICI Bank",
    content: (
      <div className="space-y-2">
        <p>
          For ICICI customers, CMR can be obtained from the{" "}
          <strong>ICICIDirect</strong> platform:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            Login to <strong>ICICIDirect</strong>
          </li>
          <li>
            Go to <strong>Account Settings</strong>
          </li>
          <li>
            Under <strong>Documents</strong>, request your CMR
          </li>
        </ul>
      </div>
    ),
  },
  {
    name: "Kotak Securities",
    content: (
      <div className="space-y-2">
        <p>
          Visit the official Kotak Securities website and login to your account.
        </p>
        <p>
          Go to <strong>Service Requests</strong> &gt;{" "}
          <strong>Document Requests</strong> &gt;{" "}
          <strong>Request for Client Master Report</strong>
        </p>
        <p>Your CMR will be emailed to your registered ID.</p>
      </div>
    ),
  },
  {
    name: "Motilal Oswal Financial Services",
    content: (
      <div className="space-y-2">
        <p>To get your CMR from Motilal Oswal:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Login to the Motilal Oswal app or portal</li>
          <li>Raise a ticket or call customer care</li>
          <li>
            Request for your <strong>Client Master Report</strong>
          </li>
        </ul>
        <p>The document will be sent to your email within 1 working day.</p>
      </div>
    ),
  },
  {
    name: "AngelOne (Angel Broking)",
    content: (
      <div className="space-y-2">
        <p>
          Login to your <strong>AngelOne</strong> app:
        </p>
        <ul className="list-decimal list-inside text-gray-700">
          <li>
            Go to <strong>My Profile</strong>
          </li>
          <li>
            Select <strong>Documents</strong>
          </li>
          <li>
            Request <strong>CMR</strong> for delivery via email
          </li>
        </ul>
        <p>The PDF will be digitally signed and usable for share transfers.</p>
      </div>
    ),
  },
  {
    name: "other brokers not mentioned above",
    content: (
      <div className="space-y-2">
        <p>If your broker is not listed above, don’t worry!</p>
        <p>
          Just <strong>contact their support team</strong> via phone, chat, or
          email and request your <strong>CMR</strong>.
        </p>
        <p>
          Most brokers provide it via email within 24–48 hours after
          verification.
        </p>
      </div>
    ),
  },
];

const DifferentBrokers = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data, isLoading } = useFetchInvResources();


  return (
    <>
      <section className="bg-white px-4  max-w-7xl mx-auto md:px-10 py-12 ">

<div
  className="text-base leading-relaxed text-gray-800 [&>p]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-4 [&>strong]:font-bold [&>a]:text-blue-600 [&>a]:underline"
  dangerouslySetInnerHTML={{ __html: data?.description || "" }}
/>
        

        {/* Broker Accordion */}
        {/* <h1 className="text-2xl md:text-4xl font-bold text-green-700 pb-10">
          How to get Client Master List (CML/CMR) from different brokers?
        </h1> */}
        {/* Introductory Content */}
        {/* <div className="mb-10 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What is Client Master List/ Client Master Report (CMR/CML)?
            </h2>
            <p className="text-gray-700">
              A Client Master Report (CMR) is a PDF certificate/document
              digitally signed by the demat brokers and provided to their
              clients.
            </p>
            <p className="text-gray-700 mt-2">
              It contains basic information about the client’s demat account,
              including details like demat account number, date of birth,
              address, bank details, etc.
            </p>
            <p className="font-semibold text-gray-800 mt-2">
              Client Master List/ Client Master Report is required to transfer
              unlisted shares from one demat account to another demat account.
            </p>
            <p className="mt-1 text-green-600">
              Check:{" "}
              <a
                href="https://www.cdslindia.com"
                target="_blank"
                className="underline"
              >
                How to transfer unlisted shares online from one demat account to
                another via CDSL Easiest
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How to get Client Master List/ Client Master Report (CML/CMR)?
            </h2>
            <p className="text-gray-700">
              Your demat broker sends you a physical copy as well as a soft copy
              of Client Master List/ Client Master Report (CML/CMR) at the time
              of account opening.
            </p>
            <p className="text-gray-700 mt-2">
              You can just call/email your demat account broker asking for
              Client Master List and they will email you the pdf document. Below
              are the steps or contact details to get Client Master Report
              (CMR/CML) from different demat brokers in India.
            </p>
          </div>
        </div> */}
      </section>

      <section className="py-10 bg-[#F7F7F7] px-4">
        <div className="space-y-3 max-w-7xl mx-auto">
          {data?.faq.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold flex justify-between items-center"
              >
                <span className="text-gray-800 font-semibold">
                   {item.question}?
                </span>
                <span className="text-gray-800 text-3xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (

                <div
                className="text-base leading-relaxed text-gray-800 [&>p]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-4 [&>strong]:font-bold [&>a]:text-blue-600 [&>a]:underline"
                dangerouslySetInnerHTML={{ __html:  item?.answer  || "" }}
              />


                // <div className="px-4 py-3 text-gray-600 text-sm bg-white" dangerouslySetInnerHTML={{ __html: item?.answer || "" }}>
                //   {/* {item.answer} */}
                // </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DifferentBrokers;
