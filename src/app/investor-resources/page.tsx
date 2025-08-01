'use client';

import Link from 'next/link';

const resources = [
  { title: 'Transfer Unlisted Shares Online', link: '#', bg: 'bg-lime-300' },
  { title: 'Off-Market Annexures of Different DPs', link: '#', bg: 'bg-cyan-400' },
  { title: 'How to get Client Master List (CML/CMR)', link: '#', bg: 'bg-blue-700 text-white' },
  { title: 'FAQs on Unlisted Shares', link: '#', bg: 'bg-green-500' },
  { title: 'How to Buy Unlisted Shares', link: '#', bg: 'bg-purple-700 text-white' },
  { title: 'PAN Number of Unlisted Companies', link: '#', bg: 'bg-fuchsia-700 text-white' },
  { title: 'How to Sell Unlisted Shares', link: '#', bg: 'bg-lime-500' },
  { title: 'Unlisted Share Research & Analysis', link: '#', bg: 'bg-yellow-400' },
  { title: 'Unlisted Shares List', link: '#', bg: 'bg-lime-300' },
  { title: "Do's & Don'ts of Investing in Unlisted Shares", link: '#', bg: 'bg-rose-500 text-white' },
];

export default function InvestorResources() {
  return (
    <div className="bg-white min-h-screen px-4 md:px-10 py-12 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-green-700 mb-2">
        Investor Resources
      </h1>
      <div className="w-12 h-1 bg-gray-300 rounded mx-auto mb-8" />

      <p className="text-center text-gray-700 mb-12">
        Welcome to our Investor Resources page, your go-to destination for valuable information and resources on unlisted shares. 
        As leading unlisted share brokers and dealers in India, our platform offers comprehensive guides, forms, and documents to help 
        you buy and sell unlisted shares, transfer them online, and explore pre-IPO and delisted share opportunities. With years of 
        experience and deep knowledge of the unlisted share market, our expert team is committed to providing you with the latest insights 
        and tools to help you make informed investment decisions. Browse our collection of resources and start your journey towards 
        unlocking the potential of unlisted shares today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`p-6 rounded-md shadow hover:scale-105 transition-transform duration-200 text-center font-medium ${item.bg}`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center bg-blue-800 text-white py-6 px-4 rounded-md">
        <p className="mb-3 text-lg font-semibold">Have a question? Contact us Now</p>
        <Link
          href="#contact"
          className="inline-block bg-white text-blue-800 font-semibold px-5 py-2 rounded hover:bg-gray-100"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
