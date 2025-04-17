
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/components/ui/use-toast";

interface ReplyFormProps {
  reply: string;
  onReplyChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ reply, onReplyChange, onSubmit }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="mt-4 text-gray-500">
        Please <Button variant="link" onClick={() => toast({ title: "Please sign in", description: "You must sign in to reply." })}>sign in</Button> to leave a reply.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <div className="mb-2">
        <label htmlFor="reply" className="block text-sm font-medium text-gray-700">
          Add a reply:
        </label>
        <Input
          id="reply"
          value={reply}
          onChange={(e) => onReplyChange(e.target.value)}
          placeholder="Your reply here..."
          className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <Button type="submit">Submit Reply</Button>
    </form>
  );
};

export default ReplyForm;
