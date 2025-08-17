"use client";
import React from 'react';
import { useUser } from '../AuthProvider';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import supabase from '@/services/supabaseClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function SettingsPage() {
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error('Error signing out');
        console.error('Sign out error:', error);
      } else {
        toast.success('Successfully signed out');
        router.push('/auth');
      }
    } catch (error) {
      toast.error('Unexpected error during sign out');
      console.error('Unexpected sign out error:', error);
    }
  };

  return (
    <div className="mt-5 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-2">Manage your account preferences and settings</p>
      </div>

      <div className="space-y-6">
        {/* Account Section */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground">Account</h3>
              <p className="text-sm text-muted-foreground">Manage your account settings</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* User Info Display */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                {user?.image_url && (
                  <img 
                    src={user.image_url} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Sign Out</h4>
                  <p className="text-sm text-muted-foreground">Sign out of your account</p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;