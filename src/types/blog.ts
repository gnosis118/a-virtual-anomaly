
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  views: number;
  category: string;
  featured: boolean;
  tags: string[];
}
