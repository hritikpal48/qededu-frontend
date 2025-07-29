import React from "react";
import HomeLayout from "@/components/layouts/homelayout/HomeLayout";
import PastIpoTable from "@/components/pastIpoTable/PastIpoTable";
import BlogCard from "@/components/blogcard/BlogCard";
import Image from "next/image";
import shareBanner from "../../../public/images/shareBanner.png";

const page = () => {
  return (
    <HomeLayout>
      <section className="max-w-7xl mx-auto pt-10 pb-3 bg-white text-gray-800">
        <div className="text-center">
          <h1 className="text-[30px] mb-3 text-4xl font-bold text-center ">
            Unlisted Shares Price List
          </h1>
          <p className="pb-5 text-center text-gray-600 text-[20px]">
            You can easily find unlisted shares price list in India that are
            available <br /> for trading. Buy and sell unlisted shares at best
            prices with us.
          </p>
          <div className="text-center flex justify-center">
            <Image
              src={shareBanner}
              alt="shareBanner"
              width={350}
              height={350}
            />
          </div>
          <div className="text-center py-10">
            <form action="" className="">
              <input
                type="search"
                placeholder="Search Share"
                className="px-5 py-3 border w-100 rounded-lg"
              />
            </form>
          </div>
        </div>
      </section>
      <PastIpoTable />
      <BlogCard />
    </HomeLayout>
  );
};

export default page;
