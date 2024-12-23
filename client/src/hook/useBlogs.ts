import { createBlog, getBlog, getBlogs } from "@/services/blogService";
import { BlogWithoutId } from "@/types/blogTypes";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
    // retry: 1,
    // gcTime: 5000, // default to 5 minute
    // refetchOnWindowFocus: false, // default to 5 true
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: ["blog"],
    queryFn: () => getBlog(id),
    // retry: 1,
    // gcTime: 5000, // default to 5 minute
    // refetchOnWindowFocus: false, // default to 5 true
  });
}

// export function useCreateBlog(blog: BlogWithoutId) {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => createBlog(blog),
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["blogs"] });
//     },
//   });
// }
