import { BLOG_TYPE } from "@/utils/constant";

export type BlogData = {
    _id:string,
    title: string;
    slug: string;
    image?: string;
    summary: string;
    status: number;
    likes: number;
    views: number;
    createdAt?: string;
    description: string;
    type: BLOG_TYPE;
    likedByIps: string[]
};

export type BlogList = BlogData[]

export type BlogParams = {
    page: number;
    limit: number;
    type?: BLOG_TYPE;
    keyword?: string;
}

export type BlogRespone = {
    data: BlogList;
    pages: number;
    totalCount: number;
    page: number;
    count: number;
}


export type GetBlogListApiParams = {
  limit: number;
  page: number;
  keyword?: string;
  type?: number;
};


export type UpdateLikeBlogParam = {
  id: string;
  ipAddress: string;
};