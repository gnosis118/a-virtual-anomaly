import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { User, Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserProfile = {
  id: string;
  email: string;
  username: string | null;
  created_at: string;
  avatar_url: string | null;
  role: 'admin' | 'user' | 'moderator';
};

const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
        
      if (rolesError) throw rolesError;
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profilesError) throw profilesError;
      
      const mappedUsers = authUsers.users.map(user => {
        const userRole = userRoles?.find(role => role.user_id === user.id);
        const profile = profiles?.find(profile => profile.id === user.id);
        
        return {
          id: user.id,
          email: user.email,
          username: profile?.username || user.email?.split('@')[0] || 'Unknown',
          created_at: user.created_at,
          avatar_url: profile?.avatar_url || null,
          role: userRole?.role || 'user'
        };
      });
      
      setUsers(mappedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users. You may not have admin privileges.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewUser = (user: UserProfile) => {
    setSelectedUser(user);
    setShowUserDialog(true);
  };
  
  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user' | 'moderator') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role: newRole 
        }, { 
          onConflict: 'user_id,role' 
        });
        
      if (error) throw error;
      
      toast({
        title: "Role Updated",
        description: `User role has been updated to ${newRole}. They can now access admin features.`,
      });
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: `Failed to update user role: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldAlert className="h-4 w-4 text-destructive mr-1" />;
      case 'moderator':
        return <ShieldCheck className="h-4 w-4 text-warning mr-1" />;
      case 'user':
        return <Shield className="h-4 w-4 text-muted-foreground mr-1" />;
      default:
        return <ShieldX className="h-4 w-4 mr-1" />;
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
      </div>
      
      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={user.avatar_url || undefined} />
                          <AvatarFallback>{getInitials(user.username || 'User')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className="flex items-center">
                        {getRoleIcon(user.role)}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <User className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant={user.role === 'admin' ? 'default' : 'secondary'}
                          size="sm"
                          onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                        >
                          {user.role === 'admin' ? (
                            <>
                              <ShieldX className="h-4 w-4 mr-1" />
                              Remove Admin
                            </>
                          ) : (
                            <>
                              <ShieldAlert className="h-4 w-4 mr-1" />
                              Make Admin
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={selectedUser.avatar_url || undefined} />
                  <AvatarFallback>{getInitials(selectedUser.username || 'User')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{selectedUser.username}</h3>
                <p className="text-muted-foreground">{selectedUser.email}</p>
                <div className="mt-2 flex items-center">
                  {getRoleIcon(selectedUser.role)}
                  <span className="text-sm font-medium">
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">User ID</p>
                  <p className="text-xs bg-muted p-2 rounded-md overflow-x-auto">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Joined</p>
                  <p>{new Date(selectedUser.created_at).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Manage Role</p>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedUser.role === 'user' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRoleChange(selectedUser.id, 'user')}
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    User
                  </Button>
                  <Button 
                    variant={selectedUser.role === 'moderator' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRoleChange(selectedUser.id, 'moderator')}
                  >
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    Moderator
                  </Button>
                  <Button 
                    variant={selectedUser.role === 'admin' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRoleChange(selectedUser.id, 'admin')}
                  >
                    <ShieldAlert className="h-4 w-4 mr-1" />
                    Admin
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
