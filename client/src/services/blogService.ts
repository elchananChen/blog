import { api } from "@/api/api";
import { Blog, BlogWithoutId } from "@/types/blogTypes";

export const createBlog = async (blog: BlogWithoutId): Promise<Blog> => {
  const { data } = await api.post("/blogs", blog);
  console.log(data);

  return data;
};

export const getBlogs = async (): Promise<Blog[]> => {
  const { data } = await api.get("/blogs/all");

  return data.blogs;
};

export const getBlog = async (id: string): Promise<Blog> => {
  const { data } = await api.get(`/blogs/${id}`);

  return data?.blog;
};
