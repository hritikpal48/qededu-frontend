
import React from "react";
import Link from "next/link";
import AppImages from "@/config/constant/app.images";
import { BlogPostType } from "@/types/blog";
import BlogCard from "@/components/ui/card/Blogcard";
const BlogPage = () => {
  const blogPosts: BlogPostType[] = [
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

  return (
    <>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-center pb-10">
          Unlisted Shares in News
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogPosts.map((post, key) => (
            <BlogCard blogData={post} key={key} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-medium transition cursor-pointer">
              View More
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
