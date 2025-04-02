
export type BlogPost = {
  id: number | string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string[] | string;
  publishdate?: string;
  status?: string;
  image_url?: string;
};
