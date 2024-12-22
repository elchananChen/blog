import { createBlog, getBlogs } from "@/services/blogService";
import { Blog } from "@/types/blogTypes";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBlogs() {
  return useQuery({
    queryKey: ["cats"],
    queryFn: () => getBlogs(),
    // retry: 1,
    // gcTime: 5000, // default to 5 minute
    // refetchOnWindowFocus: false, // default to 5 true
  });
}

export function useCreateBlog(blog: Blog) {
  const mutation = useMutation({
    mutationFn: () => createBlog(blog),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
