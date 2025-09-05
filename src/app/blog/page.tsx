"use client";
import React, { useCallback, useEffect, useState } from "react";
import BlogPage from "@/components/page/blog";
import { GetBlogListApiParams, BlogList, BlogRespone } from "@/types/blogType";
import { useFetchBlogList } from "@/services/blog.service";

const Page: React.FC = () => {
  const [blogParams, setBlogParams] = useState<GetBlogListApiParams>({
    page: 1,
    limit: 9,
    keyword: "",
    // type: undefined
  });

  // accumulated posts (flattened)
  const [allBlogData, setAllBlogData] = useState<BlogList>([]);
  const {
    data: blogDataResponse,
    isLoading: blogLoading,
    refetch,
  } = useFetchBlogList(blogParams);

  // When API response changes, normalize & append/replace
  useEffect(() => {
    if (!blogDataResponse) return;

    // Normalize response to BlogList
    const newPosts: BlogList = Array.isArray(blogDataResponse)
      ? blogDataResponse
      : blogDataResponse?.data ?? [];

    if (blogParams.page === 1) {
      setAllBlogData(newPosts);
    } else {
      // Append but avoid duplicates (by _id)
      setAllBlogData((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const filtered = newPosts.filter((p) => !existingIds.has(p._id));
        return [...prev, ...filtered];
      });
    }
  }, [blogDataResponse, blogParams.page]);

  // Load more handler (memoized)
  const handleLoadMore = useCallback(() => {
    setBlogParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  // Optional: refresh / reset (for new search, type change)
  // const handleResetAndFetch = useCallback((nextParams: Partial<GetBlogListApiParams>) => {
  //   setBlogParams(prev => ({ ...prev, page: 1, ...nextParams }));
  // }, []);

  // Determine hasMore from API response (if resp is paginated)
  const hasMore = React.useMemo(() => {
    if (!blogDataResponse) return false;
    if (Array.isArray(blogDataResponse)) {
      // If API returns plain array we don't know pages — assume load more available only when returned length === limit
      return blogDataResponse.length >= blogParams.limit;
    }
    // BlogRespone expected to have pages field
    const resp = blogDataResponse as BlogRespone;
    return blogParams.page < (resp.pages || 1);
  }, [blogDataResponse, blogParams.page, blogParams.limit]);

  return (
    <BlogPage
      blogData={allBlogData}
      blogLoading={blogLoading}
      isHomePage={false}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      onRefresh={() => {
        // optional: for UI refresh button
        setBlogParams((p) => ({ ...p, page: 1 }));
        refetch();
      }}
    />
  );
};

export default Page;
