"use client";

import Image from "next/image";

const WhyUnlistedArena = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6 rounded-lg shadow-md">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/info/why-arena.png"
            alt="Why Unlisted Arena"
            width={250}
            height={250}
            className="rounded-md"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Why Unlisted Arena?</h3>
          <p className="text-sm text-gray-600 mb-4">
            There are hundreds of unlisted share dealers you deal with, who may
            promise you a thousand things. Wondering how we’re different?
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full transition">
            Check Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyUnlistedArena;
