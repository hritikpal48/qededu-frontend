"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import appStore from "../../../../public/images/app-store-apple.png";
import playStore from "../../../../public/images/google-store.png";
import valuationImg from "../../../../public/images/valuations.png";
import needleImg from "../../../../public/images/needle.png";

export const BuySellBox = () => {
  const [tab, setTab] = useState("Buy");

  return (
    <div className="border border-[#e8e8e8] rounded-md p-4 w-full bg-white mb-4">
      <div className="flex mb-4">
        {["Buy", "Sell"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`w-1/2 py-2 text-sm font-medium border-b-2 transition cursor-pointer ${
              tab === t
                ? "border-green-600 text-green-600"
                : "border-gray-200 text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <h3 className="font-semibold text-gray-800 text-sm mb-1">
        A V Thomas & Co. Limited Unlisted Shares
      </h3>
      <p className="text-sm text-gray-700 mb-3">₹12500</p>

      <input
        type="text"
        placeholder="Buy Min (10) Quantity"
        className="w-full border px-3 py-2 text-sm rounded mb-3 border-[#d7d7d7]"
      />

      <textarea
        placeholder="Message :"
        className="w-full border px-3 py-2 text-sm rounded mb-3 border-[#d7d7d7]"
      ></textarea>

      <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded text-sm cursor-pointer">
        {tab}
      </button>
    </div>
  );
};

export const CreateAlert = () => {
  return (
    <div className="border border-[#e8e8e8] rounded-md p-4 w-full bg-white mb-4">
      <h4 className="font-semibold text-gray-800 text-sm mb-3">Create Alert</h4>

      <label className="text-xs text-gray-600 flex items-center mb-1">
        Target Price <FaInfoCircle className="ml-1 text-gray-400 text-xs" />
      </label>
      <input
        type="text"
        placeholder="Target Price"
        className="w-full border px-3 py-2 text-sm rounded mb-3 border-[#d7d7d7]"
      />

      <label className="text-xs text-gray-600 mb-1">Your Email</label>
      <input
        type="email"
        placeholder="Your Email"
        className="w-full border px-3 py-2 text-sm rounded mb-3 border-[#d7d7d7]"
      />

      <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded text-sm">
        Create Alert
      </button>
    </div>
  );
};

export const ValuationMeter = () => {
  const [position, setPosition] = useState("MED");

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev === "LOW") return "MED";
        if (prev === "MED") return "HIGH";
        return "LOW";
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []); 

  const getRotation = () => {
    switch (position) {
      case "LOW":
        return "-90deg";
      case "MED":
        return "0deg";
      case "HIGH":
        return "90deg";
      default:
        return "0deg";
    }
  };
  return (
    <div className="border border-[#e8e8e8] rounded-md p-4 bg-white mb-4 text-center">
      <div className="relative">
        <Image src={valuationImg} alt="valuation" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div
            className="relative w-8 h-24 origin-bottom transition-transform duration-1000"
            style={{ transform: `rotate(${getRotation()})` }}
          >
            <Image src={needleImg} alt="Needle" className="object-contain" />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export const DownloadApp = () => {
  return (
    <div className="bg-[#F7F7F7] border border-[#e8e8e8] rounded-md p-4 text-center">
      <h4 className="text-sm font-semibold text-green-600 mb-1">
        Download App
      </h4>
      <p className="text-xs text-gray-500 mb-3">
        Available on Android and iOS devices
      </p>
      <div className="flex justify-center space-x-2">
        <Link href="/">
          <Image
            src={appStore}
            alt="Google Play"
            className="h-8"
            width={160}
            height={80}
          />
        </Link>
        <Link href="/">
          <Image
            src={playStore}
            alt="App Store"
            className="h-8"
            width={160}
            height={80}
          />
        </Link>
      </div>
    </div>
  );
};
