"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppImages from "@/config/constant/app.images";
import { useFetchBlogDetail, useUpdateLikeBlog, useUpdateViewBlog } from "@/services/blog.service";
import Skeleton from "@/components/ui/SkeletonLoader";
import { environmentVariables } from "@/config/app.config";
import { dateFormat, getClientIp } from "@/utils";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { SiSpreadshirt } from "react-icons/si";

type BlogDetailsProps = {
    slug: string;
};

// Use the existing BlogData type instead of creating a new interface
import { BlogData } from "@/types/blogType";

export default function BlogDetails({ slug }: BlogDetailsProps) {
    const { data: initialData, isLoading, refetch } = useFetchBlogDetail(slug);
    const [blogData, setBlogData] = useState<BlogData | null>(null);
    const [currentUserIp, setCurrentUserIp] = useState<string>("");
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [hasViewUpdated, setHasViewUpdated] = useState<boolean>(false);

    // Update local state when data changes
    useEffect(() => {
        if (initialData) {
            setBlogData(initialData);
        }
    }, [initialData]);

    // Get user IP and check like status
    useEffect(() => {
        const getCurrentIp = async () => {
            try {
                const ip = await getClientIp();
                setCurrentUserIp(ip);

                // Check if current user has already liked this blog
                if (blogData?.likedByIps) {
                    const hasLiked = blogData.likedByIps.includes(ip);
                    setIsLiked(hasLiked);
                }
            } catch (error) {
                console.error('Error getting IP:', error);
            }
        };

        if (blogData) {
            getCurrentIp();
        }
    }, [blogData?.likedByIps]);

    const onError = (err: any) => {
        const message = err?.response?.data?.message;
        console.error('View update error:', message);
    };

    const onSuccess = (data: any) => {
        console.log('View updated successfully');
        // Optionally refetch if needed
    };

    const { mutate: updateViewMutation, isPending } = useUpdateViewBlog({
        onError,
        onSuccess,
    });

    const onLikeError = (err: any) => {
        const message = err?.response?.data?.message;
        console.error('Like update error:', message);

        // Revert the optimistic update on error
        if (blogData) {
            setBlogData(prev => prev ? {
                ...prev,
                likes: prev.likes - 1,
                likedByIps: prev.likedByIps.filter(ip => ip !== currentUserIp)
            } : null);
            setIsLiked(false);
        }
    };

    const onLikeSuccess = (data: any) => {
        console.log('Like updated successfully');
        // The optimistic update is already done
    };

    const { mutate: updateLikeMutation, isPending: isLikePending } = useUpdateLikeBlog({
        onError: onLikeError,
        onSuccess: onLikeSuccess,
    });

    const handleLike = async () => {
        // Prevent multiple clicks and already liked posts
        if (isLikePending || !currentUserIp || isLiked || !blogData) return;

        try {
            // Optimistic update - Update UI immediately
            setIsLiked(true);
            setBlogData(prev => prev ? {
                ...prev,
                likes: prev.likes + 1,
                likedByIps: [...prev.likedByIps, currentUserIp]
            } : null);

            // Make API call
            updateLikeMutation({ id: blogData._id, ipAddress: currentUserIp });
        } catch (error) {
            console.error('Error getting IP or updating like:', error);
        }
    };

    // Update views once when component mounts
    useEffect(() => {
        const updateViews = async () => {
            try {
                const ip = await getClientIp();
                if (blogData && !hasViewUpdated && !isPending) {
                    updateViewMutation({ id: blogData._id, ipAddress: ip });
                    setHasViewUpdated(true);
                }
            } catch (error) {
                console.error('Error getting IP or updating views:', error);
            }
        };

        if (blogData && !hasViewUpdated) {
            updateViews();
        }
    }, [blogData, hasViewUpdated, isPending, updateViewMutation]);

    const imageSrc = blogData?.image
        ? `${environmentVariables.UPLOAD_URL}/blog/${blogData.image}`
        : AppImages.blogImg.blog1;

    // While hook is loading -> show Skeleton
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <section className="max-w-7xl mx-auto px-2 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <article className="lg:col-span-2 bg-white shadow-md rounded-lg overflow-hidden">
                        <Skeleton />
                    </article>
                </section>
            </div>
        );
    }

    if (!blogData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h2>
                    <p className="text-gray-600">The requested blog post could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="max-w-7xl mx-auto px-2 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <article className="lg:col-span-2 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-64 w-full flex items-center justify-center overflow-hidden relative">
                        <Image
                            src={imageSrc}
                            alt={blogData?.title ?? "Blog Image"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Meta Info */}
                        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                            <span>
                                {blogData?.createdAt ? dateFormat(blogData.createdAt) : "—"}
                            </span>
                            <div className="flex items-center space-x-4">
                                {/* Views */}
                                <div className="flex items-center gap-1">
                                    <SiSpreadshirt className="text-gray-600" />
                                    <span className="text-xs text-gray-700">{blogData?.views || 0}</span>
                                </div>

                                {/* Likes */}
                                <div
                                    className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${isLiked
                                            ? 'bg-red-50 cursor-not-allowed'
                                            : isLikePending
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'cursor-pointer hover:bg-red-50'
                                        }`}
                                    onClick={handleLike}
                                    title={isLiked ? "You already liked this post" : "Like this post"}
                                >
                                    {isLiked ? (
                                        <FaHeart className="text-red-500" />
                                    ) : (
                                        <FaRegHeart className="text-gray-600 hover:text-red-500 transition-colors duration-200" />
                                    )}
                                    <span className={`text-xs transition-colors duration-200 ${isLiked ? 'text-red-700' : 'text-gray-700'
                                        }`}>
                                        {blogData?.likes || 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-6">
                            {blogData?.title}
                        </h1>

                        {/* Introduction / Description */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Introduction
                            </h2>
                            <div className="text-gray-700 leading-relaxed mb-4">
                                {blogData?.summary}
                            </div>
                        </section>

                        {/* If we have full description in blog -> render it (preserve newlines) */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Details
                            </h2>
                            <div
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: blogData?.description || "" }}
                            />
                        </section>
                    </div>
                </article>
            </section>
        </div>
    );
}