import { useForm } from "react-hook-form";

//  zod
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//  shadcn
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// react query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// router dom
import { useNavigate } from "react-router-dom";

// api
import { createBlog } from "@/services/blogService";

// types
import { BlogWithoutId } from "@/types/blogTypes";
import { useBlog } from "@/hook/useBlogs";

// * Zod schema to validate the inputs
const formSchema = z.object({
  title: z.string().min(2).max(20),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

interface Props {
  isEdit: boolean; // false - add  ,  true - edit
  id?: string;
}

function BlogForm({ isEdit, id }: Props) {
  // * react Query - to add blog
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  if (id) {
    const { data: blog } = useBlog(id);
    console.log(blog);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (blog: BlogWithoutId) => createBlog(blog),
    onSuccess: () => {
      // Invalidate and refetch
      console.log("seccess");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Error creating blog:", error);
    },
  });

  // * shadcn docomentation
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // * create the blog
    mutate(values);
    isPending ? "Loading.." : setTimeout(() => navigate("/blogs"), 1000);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormDescription>This is the blog title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Go nuts"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is the blog content</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default BlogForm;
