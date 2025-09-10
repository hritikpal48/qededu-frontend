import React from "react";
import Link from "next/link";
import BlogCard from "@/components/ui/card/Blogcard";
import { BlogRespone, BlogList } from "@/types/blogType";

interface BlogPageProps {
  title?:string|undefined
  blogData?: BlogList | BlogRespone; // Accept both formats
  blogLoading: boolean;
  isHomePage: boolean; // To differentiate between home and blog page
  onLoadMore?: () => void; // Function to load more data
  hasMore?: boolean; // Whether more data is available
  onRefresh?: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ 
  title,
  blogData, 
  blogLoading, 
  isHomePage = false,
  onLoadMore,
  hasMore = true,
  onRefresh
}) => {

    const blogPosts: BlogList = Array.isArray(blogData) ? blogData : blogData?.data ?? [];

  // Show loading state
  if (blogLoading && !isHomePage) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-center pb-10">
          {title||"Unlisted Shares in News"}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Loading skeleton */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-center pb-10">
          {isHomePage? 'Unlisted Shares in News':'Blog/News'}
        </h2>
        
        {blogPosts.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(isHomePage ? blogPosts.slice(0, 6) : blogPosts).map((post) => (
                <BlogCard blogData={post} key={post._id} />
              ))}
            </div>
        <div className="mt-8 text-center">
          {isHomePage ? (
            <Link
              href="/blog"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition inline-block cursor-pointer"
            >
              View All Blogs
            </Link>
          ) : hasMore ? (
            <button
              onClick={onLoadMore}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition cursor-pointer"
            >
              Load More
            </button>
          ) : (
            <div className="text-gray-500">No more Blogs!</div>
          )}
        </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;