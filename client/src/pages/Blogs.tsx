import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBlogs } from "@/hook/useBlogs";
import { makeId } from "@/utils/utils";

function Blogs() {
  const { data: blogs, error, isLoading, isFetching } = useBlogs();

  if (error) return <div>{error.message}</div>;
  if (isLoading)
    return (
      <h1 className="p-10 text-4xl text-secondary-foreground">loading...</h1>
    );

  return (
    <div className="grid grid-cols-3">
      {blogs?.map((blog) => (
        <Card key={makeId()} className="m-4 bg-secondary">
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
            {/* <CardDescription></CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>{blog.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Blogs;
