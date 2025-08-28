"use client";

import Image from "@/components/ui/Image";
import Link from "next/link";
import AppImages from "@/config/constant/app.images";
import BlogCard from "@/components/ui/card/Blogcard";
import { useFetchBlogList } from "@/services/blog.service";
import { useState } from "react";
import { GetBlogListApiParams } from "@/types/blogType";

const mediaArticles = [
  {
    logo: AppImages.about.media1,
    source: "Economic Times",
    description:
      "AGS Transact IPO may open on Jan 19; stock 68% off high in unlisted market.",
  },
  {
    logo: AppImages.about.media2,
    source: "Financial Express",
    description:
      "Tega Industries IPO share allotment: Check Status via BSE, Link Intime.",
  },
  {
    logo: AppImages.about.media3,
    source: "Business Standard",
    description:
      "Paytm debacle roils market for Unlisted Shares; prices jump downside.",
  },
];

const stats = [
  { label: "Launched", value: "2023" },
  { label: "Experts Onboard", value: "30+" },
  { label: "Students Enrolled", value: "10,000+" },
  { label: "Courses Offered", value: "50+" },
];

const blogPosts: any[] = [
  {
    id: "1",
    blogImg: AppImages.blogImg.blog1,
    altblog: "blog1",
    url: "",
    category: "CLOUD KITCHEN",
    date: "28 Jul. 2025.",
    title:
      "EatClub Secures Rs 185 Crore in Funding Led by Tiger Global: A Strong Signal for the Cloud Kitchen Sector",
    excerpt:
      "EatClub Secures Rs 185 Crore in Funding Led by Tiger Global: A Strong Signal for the Cloud Kitchen Sector A) Introduction: EatClub’s Major Fundraise and Strategic Reorganization Mumbai-based cloud kitchen...",
    content: "Full content would go here...",
  },
  {
    id: "2",
    blogImg: AppImages.blogImg.blog2,
    altblog: "blog2",
    url: "",
    category: "HDFC SECURITIES",
    date: "26 Jul. 2025.",
    title:
      "HDFC Securities Q1 FY26 Results: Revenue & Profit Decline Amid SEBI’s F&O Curbs",
    excerpt:
      "HDFC Securities Limited, one of India's leading stock broking firms, has announced its unaudited financial results for Q1 FY26. The numbers reveal a concerning trend: both revenue and profit...",
    content: "Full content would go here...",
  },
  {
    id: "3",
    blogImg: AppImages.blogImg.blog3,
    altblog: "blog3",
    url: "",
    category: "Apollo Green",
    date: "26 Jul. 2025.",
    title:
      "Apollo Green Energy Fundraise: From Bold Announcements to Fragmented Allotments",
    excerpt:
      "Apollo Green Energy Fundraise: From Bold Announcements to Fragmented Allotments Apollo Green Energy Limited (formerly Apollo International Limited), a company eyeing growth in India's renewable...",
    content: "Full content would go here...",
  },
];

const AboutPage = () => {
  const [blogParams, setBlogParams] = useState<GetBlogListApiParams>({
    page: 1,
    limit: 10,
    keyword: "",
    // type:1 Optional
  });

  const { data: blogData, isLoading: blogLoading, refetch: blogRefetch } = useFetchBlogList(blogParams);


  return (
    <>
      <section className="max-w-7xl mx-auto py-10 bg-white text-gray-800">
        <div className="px-4">
          <h1 className="text-[30px] font-bold mb-3">About Us</h1>
          <p className="pb-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
            excepturi dolores id tenetur dolorem dolore et sapiente eligendi! In
            possimus impedit cupiditate commodi! Magnam dignissimos placeat
            architecto quo voluptate harum?
          </p>
        </div>

        <div className="bg-green-50 p-6 md:p-10 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Our Journey
              </h2>
              <p className="text-sm md:text-base mb-4 leading-relaxed">
                <strong>QedEdu</strong> was founded in <strong>2023</strong> by
                a group of passionate professionals –
                <span className="text-green-700 font-semibold">
                  {" "}
                  Mr. Umesh Paliwal, Mr. Santosh Singh, and Mr. Dinesh Gupta
                </span>{" "}
                – with a vision to reshape digital learning. Recognizing the gap
                in personalized, accessible education, QedEdu was created to
                empower learners with high-quality content, mentorship, and
                real-world exposure.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                With deep experience in finance, marketing, and operations, our
                founders have combined their strengths to build a
                learner-centric EdTech platform. QedEdu focuses on transparency,
                upskilling, and personalized outcomes—enabling students to learn
                smart, not just hard.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={AppImages.about.aboutImg}
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

      <section className="bg-white text-gray-800">
        {/* In the Media */}
        <div className="max-w-7xl mx-auto py-14 px-4 md:px-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">In the Media</h2>
            <Link
              href="#"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm font-medium"
            >
              Read More
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mediaArticles.map((item, idx) => (
              <div
                key={idx}
                className="border border-[#d2d2d2] rounded-lg px-8 text-center py-10 hover:shadow-md transition"
              >
                <div className=" flex justify-center align-center mb-3">
                  <Image
                    src={item.logo}
                    alt={item.source}
                    width={40}
                    height={40}
                    className="mb-3"
                  />
                </div>
                <h4 className="font-semibold text-base mb-1">{item.source}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Life at QedEdu */}
        <div className="bg-[#F0FDF4] py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src={AppImages.about.lifeCompany}
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
              <p className="text-sm md:text-base mb-3 leading-relaxed text-gray-700">
                Life at <strong>QedEdu</strong> thrives on innovation,
                collaboration, and purpose-driven learning. We embrace
                technology to reshape how education is accessed and delivered,
                ensuring inclusivity and excellence.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                From software engineers to curriculum designers, every team
                member plays a vital role in transforming the EdTech landscape.
                Our culture values curiosity, transparency, and continuous
                improvement.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-3">
                At QedEdu, we’re not just building a platform—we’re building a
                movement. Join us and be part of an environment that values both
                professional growth and personal development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(blogData) &&
            blogData.slice(0, 3).map((post, key) => (
              <BlogCard blogData={post} key={post._id ?? key} />
            ))}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
