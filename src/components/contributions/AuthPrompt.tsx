
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const AuthPrompt: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join the Conversation</CardTitle>
        <CardDescription>
          Sign in or create an account to contribute
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  );
};

export default AuthPrompt;
