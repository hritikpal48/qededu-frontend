"use client";
import Image from "@/components/ui/Image";
import React, { useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import mediaBanner from "../../../public/images/mediaBanner.jpg";
import Link from "next/link";
import { useFetchBlogList } from "@/services/blog.service";
import { BlogList, GetBlogListApiParams } from "@/types/blogType";
import { BLOG_TYPE } from "@/utils/constant";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { environmentVariables } from "@/config/app.config";
import { useMediaDetails } from "@/services/settings.service";

const Page = () => {
  const [blogParams] = useState<GetBlogListApiParams>({
    page: 1,
    limit: 6,
    type: BLOG_TYPE.MEDIA,
  });

  const { data, isLoading } = useFetchBlogList(blogParams);
  const { data:inMedia, isLoading:inMediaLoader } = useMediaDetails();

  const mediaPosts: BlogList = Array.isArray(data) ? data : [];

  return (
    <section className="py-16 px-4 bg-white text-center">
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <div className="flex justify-center mb-6">
          <Image
            src={mediaBanner}
            alt="Qed Edu in Media"
            width={500}
            height={500}
            className="rounded-xl shadow-lg"
          />
        </div>

        <h2 className="text-2xl md:text-5xl py-5 font-extrabold text-gray-800 flex justify-center items-center">
          Qed Edu – In Media{" "}
          <span className="ml-1 text-green-600">
            <IoShieldCheckmarkSharp />
          </span>
        </h2>

     {inMediaLoader ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkeletonLoader />
          </div>
           ) : (
        <p className="text-[18px] text-gray-600 mt-2 max-w-3xl mx-auto">
          {inMedia?.description}
        </p>
           )}

        <h2 className="inline-block mt-4 text-green-600 font-semibold text-[32px] py-5">
          Check Our Recent Media Coverage
        </h2>

        {/* Media Coverage Grid */}
        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkeletonLoader />
          </div>
        ) : (
          <div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mediaPosts?.map((item) => {
                const link = item.link || `/blog/${item.slug}`;
                return (
                  <Link
                    key={item._id}
                    href={link}
                    target={item.link ? "_blank" : "_self"}
                    rel={item.link ? "noopener noreferrer" : undefined}
                    className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300 p-6 flex flex-col text-center"
                  >
                    {/* Title */}
                    <p className="text-xs font-semibold text-emerald-500 mb-3 uppercase tracking-wider">
                      {item.title}
                    </p>

                    {/* Logo */}
                    {item.image && (
                      <div className="flex justify-center items-center mb-4">
                        <Image
                          src={`${environmentVariables.UPLOAD_URL}/blog/${item?.image}`}
                          alt={item.title}
                          width={200}
                          height={80}
                          className="object-contain transition rounded-md max-h-[80px]"
                        />
                      </div>
                    )}

                    {/* Description */}
                    {item.summary && (
                      <p className="text-gray-800 text-[15px] leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* View All Button */}
              <div className="mt-10 flex justify-center">
                <Link
                  href="/blog"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition inline-block cursor-pointer"
                >
                  View All Media
                </Link>
              </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
