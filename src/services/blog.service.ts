import {
  BlogData,
  BlogParams,
  BlogRespone,
  UpdateLikeBlogParam,
} from "@/types/blogType";
import HttpService from "./http.service";
import { createMutationHook, useQueryHook } from "@/hooks/useMutationHook";

//Get All Blogs
const getAllBlogs = async (params: BlogParams): Promise<BlogRespone> => {
  const res = await HttpService.get("/blog", { params });
  return res?.data?.data;
};

//get blog by slug
const getBlogBySlug = async (slug: string): Promise<BlogData> => {
  const res = await HttpService.get(`/blog/slug/${slug}`);
  return res?.data?.data;
};

//like blog
const updateLikeBlog = async ({
  id,
  ipAddress,
}: UpdateLikeBlogParam): Promise<void> => {
  const res = await HttpService.patch(`/blog/likes/${id}`, { ipAddress });
  return res.data?.data;
};

//views blog
const updateViewBlog = async ({
  id,
  ipAddress,
}: UpdateLikeBlogParam): Promise<void> => {
  const res = await HttpService.patch(`/blog/views/${id}`, { ipAddress });
  return res.data.data;
};

//Mutation
export const useFetchBlogList = (params: BlogParams) =>
  useQueryHook({
    queryKey: ["get_all_blog", params?.page?.toString()],
    queryFn: () => getAllBlogs(params),
  });

export const useFetchBlogDetail = (slug: string) =>
  useQueryHook({
    queryKey: ["get_blog_detail", slug],
    queryFn: () => getBlogBySlug(slug),
  });

export const useUpdateLikeBlog = createMutationHook(updateLikeBlog);
export const useUpdateViewBlog = createMutationHook(updateViewBlog);
