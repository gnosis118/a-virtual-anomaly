
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import PostManagement from '@/components/admin/PostManagement';
import UserManagement from '@/components/admin/UserManagement';
import SiteSettings from '@/components/admin/SiteSettings';
import MediaManager from '@/components/admin/MediaManager';
import AuthScreen from '@/components/admin/AuthScreen';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminPage = () => {
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      if (!user) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        // Check if user has admin role
        const { data: userRoles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin');

        if (error) {
          throw error;
        }

        setIsAuthorized(userRoles && userRoles.length > 0);
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast({
          title: 'Error',
          description: 'Failed to verify admin privileges.',
          variant: 'destructive'
        });
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container max-w-7xl mx-auto px-4 py-24">
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-2">Access Restricted</h1>
            <p className="mb-4">You don't have permission to access the admin area.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Return to Homepage
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <PostManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
          
          <TabsContent value="media">
            <MediaManager />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
