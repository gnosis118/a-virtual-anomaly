
export interface Rating {
  overall: number;  // Out of 5
  usability: number;
  features: number;
  valueForMoney: number;
  customerSupport: number;
}

export interface Review {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  datePublished: string;
  author: string;
  rating: Rating;
  productUrl: string;
  category: string;
  tags: string[];
}
