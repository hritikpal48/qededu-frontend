import Image from "@/components/ui/Image";
import React, { useState, useEffect } from "react";
import { SiSpreadshirt } from "react-icons/si";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { BlogData } from "@/types/blogType";
import { environmentVariables } from "@/config/app.config";
import { dateFormat, getClientIp } from "@/utils";
import { BLOG_TYPE } from "@/utils/constant";
import { useUpdateLikeBlog } from "@/services/blog.service";

interface Props {
    blogData: BlogData;
}

interface UpdatedBlogData extends BlogData {
    likes: number;
    likedByIps: string[];
}

const BlogCard = (props: Props) => {
    const [blogData, setBlogData] = useState<UpdatedBlogData>(props.blogData as UpdatedBlogData);
    const [currentUserIp, setCurrentUserIp] = useState<string>("");
    const [isLiked, setIsLiked] = useState<boolean>(false);

    // Get user IP on component mount
    useEffect(() => {
        const getCurrentIp = async () => {
            try {
                const ip = await getClientIp();
                setCurrentUserIp(ip);
                
                // Check if current user has already liked this blog
                const hasLiked = blogData.likedByIps?.includes(ip) || false;
                setIsLiked(hasLiked);
            } catch (error) {
                console.error('Error getting IP:', error);
            }
        };
        
        getCurrentIp();
    }, [blogData.likedByIps]);

    const onError = (err: any) => {
        const message = err?.response?.data?.message;
        console.error('Like update error:', message);
        
        // Revert the optimistic update on error (only if it was a like attempt)
        setBlogData(prev => ({
            ...prev,
            likes: prev.likes - 1,
            likedByIps: (prev.likedByIps || []).filter(ip => ip !== currentUserIp)
        }));
        setIsLiked(false);
    };

    const onSuccess = (data: any) => {
        console.log('Like updated successfully:', data);
        // The optimistic update is already done, no need to do anything here
    };

    const { mutate: updateLikeMutation, isPending: isLikePending } = useUpdateLikeBlog({
        onError,
        onSuccess,
    });

    const handleLike = async () => {
        // Prevent multiple clicks and already liked posts
        if (isLikePending || !currentUserIp || isLiked) return;

        try {
            // Optimistic update - Update UI immediately (only for like, not unlike)
            setIsLiked(true);
            
            setBlogData(prev => ({
                ...prev,
                likes: prev.likes + 1,
                likedByIps: [...(prev.likedByIps || []), currentUserIp]
            }));

            // Make API call
            updateLikeMutation({ 
                id: blogData._id, 
                ipAddress: currentUserIp 
            });

        } catch (error) {
            console.error('Error in handleLike:', error);
        }
    };

    return (
        <div key={blogData?._id} className="border-b border-gray-200 pb-8">
            <div className="h-[250px] overflow-hidden rounded-2xl mb-4">
                <Image
                    src={`${environmentVariables.UPLOAD_URL}/blog/${blogData?.image}`}
                    alt={blogData?.title || 'Blog'}
                    width={600}
                    className="img-fluid hover:scale-110 transition"
                />
            </div>
            
            <div className="flex justify-between">
                <div className="text-[12px] font-semibold text-gray-800">
                    {blogData?.type ? BLOG_TYPE[blogData.type] : ""}
                </div>
                
                <div className="flex gap-2 items-center">
                    {/* Views */}
                    <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-2xl">
                        <SiSpreadshirt className="text-gray-600" />
                        <span className="text-xs text-gray-700">{blogData.views || 0}</span>
                    </div>
                    
                    {/* Likes */}
                    <div 
                        className={`flex items-center gap-1 px-2 py-1 rounded-2xl text-sm transition-all duration-200 ${
                            isLiked 
                                ? 'bg-red-100 cursor-pointer' 
                                : isLikePending 
                                    ? 'opacity-50 cursor-not-allowed bg-gray-200' 
                                    : 'bg-gray-200 cursor-pointer hover:bg-red-50'
                        }`}
                        onClick={handleLike}
                        title={isLiked ? "You already liked this post" : "Like this post"}
                    >
                        {isLiked ? (
                            <FaHeart className="text-red-500 cursor-not-allowed" />
                        ) : (
                            <FaRegHeart className="text-gray-600 hover:text-red-500 transition-colors duration-200" />
                        )}
                        <span className={`text-xs transition-colors duration-200 ${
                            isLiked ? 'text-red-700' : 'text-gray-700'
                        }`}>
                            {blogData.likes || 0}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-2">
                {blogData?.createdAt ? dateFormat(blogData.createdAt) : "—"}
            </div>
            
            <Link href={`/blog/${blogData?.slug}`}>
                <h2 className="text-xl font-bold mt-4 mb-2 line-clamp-2 hover:text-green-600 cursor-pointer transition-colors duration-200">
                    {blogData?.title}
                </h2>
            </Link>
            
            <p className="text-gray-700 line-clamp-3">{blogData?.summary}</p>
        </div>
    );
};

export default BlogCard;