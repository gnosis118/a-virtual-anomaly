
import React from 'react';
import { Reply } from '@/types/discussion';
import ReplyItem from './ReplyItem';

interface ReplyListProps {
  replies: Reply[];
}

const ReplyList: React.FC<ReplyListProps> = ({ replies }) => {
  if (replies.length === 0) {
    return <p className="text-gray-500">No replies yet. Be the first to reply!</p>;
  }

  return (
    <ul className="space-y-4">
      {replies.map(reply => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </ul>
  );
};

export default ReplyList;
