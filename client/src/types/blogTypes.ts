export type Blog = {
  id: string;
  title: string;
  content: string;
};

export type BlogWithoutId = Omit<Blog, "id">;
