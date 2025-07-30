import Image from "next/image";
import React from "react";
import blog1 from "../../../public/images/blogImg/blog1.jpg";
import blog2 from "../../../public/images/blogImg/blog2.jpg";
import blog3 from "../../../public/images/blogImg/blog3.jpg";
import { SiSpreadshirt } from "react-icons/si";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

interface BlogPost {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  altblog: string;
  blogImg: string;
  url: string;
}

const BlogCard = () => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      blogImg: blog1,
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
      blogImg: blog2,
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
      blogImg: blog3,
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
    {
      id: "1",
      blogImg: blog1,
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
      blogImg: blog2,
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
      blogImg: blog3,
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
      <div className="max-w-7xl mx-auto py-10 ">
        <h2 className="text-4xl font-bold text-center pb-10">
          Unlisted Shares in News
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-8">
              <div className="h-[250px] overflow-hidden rounded-2xl mb-4">
                <Image
                  src={post.blogImg}
                  alt={post.altblog}
                  className="img-fluid hover:scale-110 transition"
                />
              </div>
              <div className="flex justify-between">
                <div className="text-[12px] font-semibold text-gray-800">
                  {post.category}
                </div>
                <div className="flex gap-2 align-center">
                  <div className="flex align-center gap-1 bg-gray-200 px-2 py-1 rounded-2xl">
                    <SiSpreadshirt />
                    <span className="text-xs">123</span>
                  </div>
                  <div className="flex align-center gap-1 bg-gray-200 px-2 py-1 rounded-2xl text-sm cursor-pointer">
                    <FaRegHeart />
                    <span className="text-xs">1</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{post.date}</div>
              <Link href={post.url}>
                <h2 className="text-xl font-bold mt-4 mb-2 line-clamp-2 hover:text-green-600 cursor-pointer">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
            </div>
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

export default BlogCard;
