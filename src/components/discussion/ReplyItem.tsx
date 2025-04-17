
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reply } from '@/types/discussion';

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply }) => {
  return (
    <li className="bg-white shadow rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://avatar.vercel.sh/${reply.profiles?.username}.png`} alt={reply.profiles?.username || "Avatar"} />
          <AvatarFallback>{reply.profiles?.username?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium leading-none">{reply.profiles?.username || 'Anonymous'}</div>
          <p className="text-sm text-gray-500">
            <Calendar className="mr-1 inline-block h-4 w-4 align-middle" />
            <span className="align-middle">Posted {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}</span>
          </p>
          <p className="text-gray-700 mt-1">{reply.content}</p>
        </div>
      </div>
    </li>
  );
};

export default ReplyItem;
