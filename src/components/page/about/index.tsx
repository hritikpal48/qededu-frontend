"use client";

import Image from "@/components/ui/Image";
import Link from "next/link";
import AppImages from "@/config/constant/app.images";
import BlogCard from "@/components/ui/card/Blogcard";
import { useFetchBlogList } from "@/services/blog.service";
import { useState, useMemo } from "react";
import { BlogList, GetBlogListApiParams } from "@/types/blogType";
import { useFetchAbout } from "@/services/settings.service";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { environmentVariables } from "@/config/app.config";
import { BLOG_TYPE } from "@/utils/constant";

const stats = [
  { label: "Launched", value: "2023" },
  { label: "Experts Onboard", value: "30+" },
  { label: "Students Enrolled", value: "10,000+" },
  { label: "Courses Offered", value: "50+" },
];

const AboutPage = () => {
  const [blogParams] = useState<GetBlogListApiParams>({
    page: 1,
    limit: 3,
    keyword: "",
  });

  const { data: blogData, isLoading: blogLoading } = useFetchBlogList(blogParams);
  const { data: aboutData, isLoading: aboutLoading } = useFetchAbout();

  // ✅ MEMOIZED MEDIA PARAMS (avoid duplicate API calls)
  const mediaParams = useMemo(
    () => ({
      page: 1,
      limit: 3,
      type: BLOG_TYPE.MEDIA,
    }),
    []
  );

  const { data: inMedia, isLoading: inMediaLoader } = useFetchBlogList(mediaParams);

  // ✅ Always fallback to empty array if response is not array
  const mediaPosts: BlogList = Array.isArray(inMedia) ? inMedia : [];

  return (
    <>
      <section className="max-w-7xl mx-auto py-10 bg-white text-gray-800">
        <div className="px-4">
          <h1 className="text-[30px] font-bold mb-3">About Us</h1>
          {aboutLoading ? (
            <SkeletonLoader className="h-6 w-full mb-4" />
          ) : (
            <p className="pb-10">{aboutData?.description}</p>
          )}
        </div>

        <div className="bg-green-50 p-6 md:p-10 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Our Journey
              </h2>
              {aboutLoading ? (
                <SkeletonLoader className="h-6 w-full mb-4" />
              ) : (
                <>
                  <p className="text-sm md:text-base mb-4 leading-relaxed">
                    {aboutData?.history}
                  </p>
                  <p className="text-sm md:text-base leading-relaxed">
                    {aboutData?.history2}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-center">
              <Image
                src={
                  aboutData?.image1?.trim()
                    ? `${environmentVariables.UPLOAD_URL}/about/${aboutData.image1}`
                    : AppImages.about.aboutImg
                }
                alt="Journey Illustration"
                width={300}
                height={300}
                className="w-full max-w-xs md:max-w-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-10 px-4 md:px-8">
          {stats.map((item, idx) => (
            <div key={idx} className="py-10 border border-[#ccc] rounded-lg">
              <h3 className="text-[28px] font-semibold text-gray-900">
                {item.value}
              </h3>
              <p className="text-[20px] text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ MEDIA SECTION */}
      <section className="bg-white text-gray-800">
        <div className="max-w-7xl mx-auto py-14 px-4 md:px-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">In the Media</h2>
            <Link
              href="/blog"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm font-medium"
            >
              Read More
            </Link>
          </div>

          {inMediaLoader ? (
            <SkeletonLoader className="h-24 w-full mb-4" />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {mediaPosts.length > 0 ? (
                mediaPosts.map((item) => {
                  const link = item.link || `/blog/${item.slug}`;
                  return (
                    <div
                      key={item._id}
                      className="border border-[#d2d2d2] rounded-lg px-8 text-center py-10 hover:shadow-md transition"
                    >
                      <Link
                        href={link}
                        target={item.link ? "_blank" : "_self"}
                        rel={item.link ? "noopener noreferrer" : undefined}
                        className="group flex flex-col items-center text-center"
                      >
                        <Image
                          src={
                            item?.image
                              ? `${environmentVariables.UPLOAD_URL}/blog/${item.image}`
                              : "/default-image.png"
                          }
                          alt={item.title}
                          width={80}
                          height={80}
                          className="mb-3 rounded-md"
                        />
                        <h4 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {item.summary}
                        </p>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center col-span-3">
                  No media posts available.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Life at QedEdu */}
        <div className="bg-[#F0FDF4] py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src={
                  aboutData?.image2?.trim()
                    ? `${environmentVariables.UPLOAD_URL}/about/${aboutData.image2}`
                    : AppImages.about.lifeCompany
                }
                alt="QedEdu Team"
                width={600}
                height={400}
                className="rounded-xl shadow-md"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Life at QedEdu
              </h2>
              {aboutLoading ? (
                <SkeletonLoader className="h-6 w-full mb-4" />
              ) : (
                <>
                  <p className="text-sm md:text-base mb-3 leading-relaxed text-gray-700">
                    {aboutData?.summary}
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    {aboutData?.summary2}
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-3">
                    {aboutData?.summary3}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Blog Section */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(blogData) &&
            blogData.map((post, key) => (
              <BlogCard blogData={post} key={post._id ?? key} />
            ))}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
