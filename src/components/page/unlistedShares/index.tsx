"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BlogCard from "@/components/page/blog";
import Image from "@/components/ui/Image";
import AppImages from "@/config/constant/app.images";
import StockList from "../home/StockList";
import { useFetchBlogList } from "@/services/blog.service";
import { GetBlogListApiParams } from "@/types/blogType";
import { GetStockListApiParams } from "@/types/stock";
import { useFetchStockList } from "@/services/stock.service";
import { useDebounce } from "@/hooks/useDebounce";
import TextInput from "@/components/ui/input/TextInput";
import { useFetchUnlisted } from "@/services/settings.service";
import { environmentVariables } from "@/config/app.config";

// Form validation schema
interface SearchFormData {
  searchQuery: string;
}

const UnlistedSharesPage = () => {
  // React Hook Form setup

  const { data, isLoading } = useFetchUnlisted();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SearchFormData>({
    defaultValues: {
      searchQuery: ""
    }
  });

  // Watch search input for debouncing
  const searchQuery = watch("searchQuery");
  const debouncedSearch = useDebounce(searchQuery || "", 500);

  // Stock list state and API
  const [stockParams, setStockParams] = useState<GetStockListApiParams>({
    page: 1,
    limit: 10,
    keyword: "",
    type: 1,
  });

  const {
    data: stockData,
    isLoading: isStockLoading,
    refetch: refetchStocks
  } = useFetchStockList(stockParams);

  // Blog list state and API
  const [blogParams] = useState<GetBlogListApiParams>({
    page: 1,
    limit: 10,
    keyword: "",
  });

  const {
    data: blogData,
    isLoading: isBlogLoading
  } = useFetchBlogList(blogParams);

  // Handlers for pagination
  const handlePageChange = useCallback((page: number) => {
    setStockParams(prev => ({ ...prev, page }));
    setTimeout(() => refetchStocks(), 100);
  }, [refetchStocks]);

  const handleLimitChange = useCallback((limit: number) => {
    setStockParams(prev => ({ ...prev, limit, page: 1 }));
    setTimeout(() => refetchStocks(), 100);
  }, [refetchStocks]);

  // Auto-search with debounce
  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();

    setStockParams(prev => ({
      ...prev,
      keyword: trimmedSearch,
      page: 1
    }));

    // Trigger API call after state update
    const timer = setTimeout(() => {
      refetchStocks();
    }, 100);

    return () => clearTimeout(timer);
  }, [debouncedSearch, refetchStocks]);

  // Manual search form submission
  const onSearchSubmit = (data: SearchFormData) => {
    const keyword = data.searchQuery.trim();

    setStockParams(prev => ({
      ...prev,
      keyword,
      page: 1
    }));

    setTimeout(() => refetchStocks(), 0);
  };

  // Clear search handler
  const handleClearSearch = () => {
    reset({ searchQuery: "" });
    setStockParams(prev => ({
      ...prev,
      keyword: "",
      page: 1
    }));
    setTimeout(() => refetchStocks(), 100);
  };

  // Check if we have search results
  const hasSearchQuery = (stockParams.keyword || "").length > 0;
  const hasResults = (stockData?.data?.length || 0) > 0;
  const showNoResults = !isStockLoading && hasSearchQuery && !hasResults;

  return (
    <>
      {/* Header Section */}
      <section className="max-w-7xl mx-auto pt-10 pb-3 bg-white text-gray-800">
        <div className="text-center px-2 md:px-0">
          <h1 className="text-[25px] md:text-[30px] mb-3 font-bold text-center">
            {data?.heading || "Unlisted Shares Price List"}
          </h1>

          <p className="text-center text-[#4b4b4b] mb-8">
            {data?.title ? (
              data.title
            ) : (
              <>
                You can easily find unlisted shares price list in India that are available
                <br />
                for trading. Buy and sell unlisted shares at best prices with us.
              </>
            )}
          </p>


          {/* Hero Image */}
          <div className="text-center flex justify-center overflow-hidden">
            <Image
              src={`${environmentVariables.UPLOAD_URL}/setting/${data?.image}` || AppImages.share.shareBanner}
              alt="Unlisted Shares Banner"
              width={350}
              height={350}
            />
          </div>

          {/* Search Form */}
          <div className="text-center py-10">
            <form
              onSubmit={handleSubmit(onSearchSubmit)}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-end gap-2">
                <div className="relative">
                  <TextInput
                    label=""
                    name="searchQuery"
                    placeholder="Search Share (e.g., Reliance, TCS, etc.)"
                    register={register}
                    error={errors.searchQuery}
                    className="w-80"
                  />

                  {/* Clear Button */}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Search Button */}
                {/* <button
                  type="submit"
                  disabled={isStockLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isStockLoading ? "Searching..." : "Search"}
                </button> */}
              </div>

              {/* Search Status */}
              <div className="text-sm text-gray-500">
                {hasSearchQuery && (
                  <span>
                    {isStockLoading ? (
                      "Searching for shares..."
                    ) : (
                      `Found ${stockData?.totalItems || 0} shares for "${stockParams.keyword}"`
                    )}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Loading Indicator */}
      {isStockLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading shares...</p>
        </div>
      )}

      {/* Stock Results */}
      <StockList
        data={stockData?.data ?? []}
        loading={isStockLoading}
        page={stockParams.page}
        perPage={stockParams.limit}
        totalItems={stockData?.totalItems ?? 0}
        setPage={handlePageChange}
        setPerPage={handleLimitChange}
      />

      {/* No Results Message */}
      {showNoResults && (
        <div className="text-center py-12 bg-gray-50">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No shares found
            </h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any shares matching "{stockParams.keyword}".
              Try searching with different keywords.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Show All Shares
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Section */}
      <BlogCard
        blogData={blogData}
        blogLoading={isBlogLoading}
        isHomePage={true}
      />
    </>
  );
};

export default UnlistedSharesPage;