
import { BLOG_POSTS } from './posts';

// Generate all unique tags from blog posts
export const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(post => post.tags))];
