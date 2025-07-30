'use client'

import Image from 'next/image';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

export const BuySellBox = () => {
  const [tab, setTab] = useState('Buy');

  return (
    <div className="border rounded-md p-4 w-full bg-white mb-4">
      <div className="flex mb-4">
        {['Buy', 'Sell'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`w-1/2 py-2 text-sm font-medium border-b-2 transition ${
              tab === t ? 'border-green-500 text-green-600' : 'border-gray-200 text-gray-500'
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
        className="w-full border px-3 py-2 text-sm rounded mb-3"
      />

      <textarea
        placeholder="Message :"
        className="w-full border px-3 py-2 text-sm rounded mb-3"
      ></textarea>

      <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded text-sm">
        {tab}
      </button>
    </div>
  );
};

export const CreateAlert = () => {
  return (
    <div className="border rounded-md p-4 w-full bg-white mb-4">
      <h4 className="font-semibold text-gray-800 text-sm mb-3">Create Alert</h4>

      <label className="text-xs text-gray-600 flex items-center mb-1">
        Target Price <FaInfoCircle className="ml-1 text-gray-400 text-xs" />
      </label>
      <input
        type="text"
        placeholder="Target Price"
        className="w-full border px-3 py-2 text-sm rounded mb-3"
      />

      <label className="text-xs text-gray-600 mb-1">Your Email</label>
      <input
        type="email"
        placeholder="Your Email"
        className="w-full border px-3 py-2 text-sm rounded mb-3"
      />

      <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded text-sm">
        Create Alert
      </button>
    </div>
  );
};

export const ValuationMeter = () => {
  return (
    <div className="border rounded-md p-4 bg-white mb-4 text-center">
      <div className="text-xs font-semibold text-gray-600 mb-2">VALUATION</div>
      <div className="relative h-24">
        <div className="absolute left-0 right-0 top-0 text-xs text-gray-400 flex justify-between px-2">
          <span>LOW</span>
          <span>MED</span>
          <span>HIGH</span>
        </div>
        <div className="mt-8">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="w-1/6 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DownloadApp = () => {
  return (
    <div className="bg-gray-50 border rounded-md p-4 text-center">
      <h4 className="text-sm font-semibold text-green-600 mb-1">Download App</h4>
      <p className="text-xs text-gray-500 mb-3">Available on Android and iOS devices</p>
      <div className="flex justify-center space-x-2">
        <Image
          src="/images/google-play.png"
          alt="Google Play"
          className="h-8"
          width={300}
          height={300}
        />
        <Image
          src="/images/apple-store.png"
          alt="App Store"
          className="h-8"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};
