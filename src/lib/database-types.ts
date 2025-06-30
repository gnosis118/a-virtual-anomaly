
// Temporary type definitions until Supabase schema syncs
export interface ScheduledPost {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  author: string | null;
  category: string | null;
  tags: string | null;
  status: string;
  publishdate: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: any;
  created_at: string;
  updated_at: string;
}
