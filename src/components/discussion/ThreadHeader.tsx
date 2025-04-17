
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Thread } from '@/types/discussion';

interface ThreadHeaderProps {
  thread: Thread;
}

const ThreadHeader: React.FC<ThreadHeaderProps> = ({ thread }) => {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>
      <p className="text-gray-700">{thread.content}</p>
      <div className="text-sm text-gray-500 mt-2">
        Posted {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })} by {thread.profiles?.username || 'Anonymous'}
      </div>
    </div>
  );
};

export default ThreadHeader;
