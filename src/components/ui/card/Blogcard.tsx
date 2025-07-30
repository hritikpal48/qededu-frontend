import Image from "@/components/ui/Image";
import React from "react";
import { SiSpreadshirt } from "react-icons/si";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { BlogPostType } from "@/types/blog";
interface Props {
    blogData: BlogPostType
}
const BlogCard = (props: Props) => {
    const { blogData } = props
    return (
        <div key={blogData?.id} className="border-b border-gray-200 pb-8">
            <div className="h-[250px] overflow-hidden rounded-2xl mb-4">
                <Image
                    src={blogData?.blogImg}
                    alt={blogData?.altblog}
                    width={600}
                    className="img-fluid hover:scale-110 transition"
                />
            </div>
            <div className="flex justify-between">
                <div className="text-[12px] font-semibold text-gray-800">
                    {blogData?.category}
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
            <div className="text-sm text-gray-500">{blogData?.date}</div>
            <Link href={blogData?.url}>
                <h2 className="text-xl font-bold mt-4 mb-2 line-clamp-2 hover:text-green-600 cursor-pointer">
                    {blogData?.title}
                </h2>
            </Link>
            <p className="text-gray-700 line-clamp-3">{blogData?.excerpt}</p>
        </div>
    );
};

export default BlogCard;
