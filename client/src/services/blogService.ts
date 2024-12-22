import { api } from "@/api/api";
import { Blog } from "@/types/blogTypes";

export const createBlog = async (blog: Blog): Promise<Blog> => {
  const { data } = await api.post("/blogs", blog);
  console.log(data);

  return data;
};

export const getBlogs = async (): Promise<Blog[]> => {
  const { data } = await api.get("/blogs/all");

  return data.blogs;
};
