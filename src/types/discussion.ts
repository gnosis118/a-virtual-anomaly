
export interface Profile {
  username: string | null;
}

export interface Reply {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  thread_id: string;
  likes: number | null;
  profiles: Profile | null;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  replies_count: number | null;
  tags: string[] | null;
  likes: number | null;
  profiles: Profile | null;
}
