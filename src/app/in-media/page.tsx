import Image from "next/image";
import React from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import mediaBanner from "../../../public/images/mediaBanner.jpg";
import mediaCoverage1 from "../../../public/images/media/mediaCoverage1.png";
import mediaCoverage2 from "../../../public/images/media/mediaCoverage2.png";
import mediaCoverage3 from "../../../public/images/media/mediaCoverage3.png";
import mediaCoverage4 from "../../../public/images/media/mediaCoverage4.png";
import Link from "next/link";

const page = () => {
  const mediaItems = [
    {
      title: "Featured in Money Control",
      logo: mediaCoverage1,
      description:
        "Unlisted stocks face moderate correction amid market sell-off",
      link: "#",
    },
    {
      title: "Featured in Money Control",
      logo: mediaCoverage2,
      description:
        "Migo files high in pre-IPO markets while Oyo slumps, Mobikwik makes a comeback",
      link: "#",
    },
    {
      title: "Featured in Money Control",
      logo: mediaCoverage3,
      description: "Tata Technologies Unlisted Shares | Tata Technologies IPO",
      link: "#",
    },
    {
      title: "Featured in Business Today",
      logo: mediaCoverage4,
      description: "Senco Gold IPO",
      link: "#",
    },
  ];

  return (
    <>
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <Image
              src={mediaBanner}
              alt="Qed Edu in Media"
              width={500}
              height={500}
            />
          </div>

          <h2 className="text-2xl md:text-5xl py-5 font-extrabold text-gray-800 flex justify-center align-center">
            Qed Edu – In Media{" "}
            <span className="ml-1 text-green-600">
              <IoShieldCheckmarkSharp />
            </span>
          </h2>

          <p className="text-[18px] text-gray-600 mt-2 max-w-3xl mx-auto">
            Qed Edu is featured in India’s top financial publications like
            Economic Times, Money Control, LiveMint, CNBC TV18, Financial
            Express, Business Standard, Business Today, and more—covering
            everything from unlisted shares, IPOs, and investment trends.
          </p>

          <h2 className="inline-block mt-4 text-green-600 font-semibold text-[35px] py-5">
            Check Our Recent Media Coverage
          </h2>

          {/* Media Coverage Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300 p-6 flex flex-col justify-between text-center"
              >
                {/* Title */}
                <p className="text-xs font-semibold text-emerald-500 mb-2 uppercase tracking-wider">
                  {item.title}
                </p>

                {/* Logo */}
                <div className="flex justify-center items-center mb-4 h-12">
                  <Image
                    src={item.logo}
                    alt={item.title}
                    width={120}
                    height={40}
                    className="object-contain transition"
                  />
                </div>

                {/* Description */}
               <p className="text-[#000] leading-relaxed text-[16px]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
