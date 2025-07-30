import Image from "@/components/ui/Image";
import React from "react";
import AppImages from "@/config/constant/app.images";
const FaqPage = () => {
  return (
    <>
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text */}
          <div className="w-full md:w-1.5/3">
            <h2 className="text-3xl md:text-[60px] font-bold text-gray-900 leading-tight">
              Got Questions? <br className="hidden md:block" />
              <span className="text-black">
                – We have answers for all your basic to advance level queries
              </span>
            </h2>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-4/3 flex justify-center">
            <Image
              src={AppImages.faq.faqBanner}
              alt="Looking for an Answer Illustration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
