"use client"
import React, { useState } from "react";
import BlogCard from "@/components/page/blog";
import Image from "@/components/ui/Image";
import AppImages from "@/config/constant/app.images";
import StockList from "../home/StockList";
const UnlistedSharesPage = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <section className="max-w-7xl mx-auto pt-10 pb-3 bg-white text-gray-800">
        <div className="text-center px-2 md:px-0">
          <h1 className="text-[25px] md:text-[30px] mb-3 font-bold text-center ">
            Unlisted Shares Price List
          </h1>
          <p className="pb-5 text-center text-gray-600 md:text-[20px] text-[16px]">
            You can easily find unlisted shares price list in India that are
            available <br /> for trading. Buy and sell unlisted shares at best
            prices with us.
          </p>
          <div className="text-center flex justify-center overflow-hidden">
            <Image
              src={AppImages.share.shareBanner}
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
                onChange={e => setSearch(e?.target?.value)}
              />
            </form>
          </div>
        </div>
      </section>
      <StockList searchKeyword={search} />
      <BlogCard />
    </>
  );
};

export default UnlistedSharesPage;
