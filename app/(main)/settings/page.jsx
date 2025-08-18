"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '../AuthProvider';
import { Button } from '@/components/ui/button';
import { LogOut, User, CreditCard, Zap, Plus, Moon, Sun, Palette } from 'lucide-react';
import supabase from '@/services/supabaseClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';

function SettingsPage() {
  const { user } = useUser();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration for theme
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="mt-5 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-2">Manage your account preferences and settings</p>
      </div>

      <div className="space-y-6">
        {/* Credits & Billing Section */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground">Credits & Billing</h3>
              <p className="text-sm text-muted-foreground">Manage your interview credits</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Credit Balance Display */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{user?.credits || 0}</p>
                    <p className="text-sm text-muted-foreground">Available credits</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Interview Credits</p>
                  <p className="text-xs text-muted-foreground">Each credit = 1 interview</p>
                </div>
              </div>
            </div>

            {/* Purchase Credits Button */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Need More Credits?</h4>
                  <p className="text-sm text-muted-foreground">Purchase additional interview credits</p>
                </div>
                <Link href="/billing">
                  <Button className="flex cursor-pointer items-center gap-2 bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    Purchase Credits
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground">Appearance</h3>
              <p className="text-sm text-muted-foreground">Customize your interface theme</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Theme Toggle */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Theme</h4>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
                {mounted && (
                  <Button 
                    variant="outline" 
                    onClick={toggleTheme}
                    className="flex items-center cursor-pointer gap-2"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-4 w-4" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" />
                        Dark Mode
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

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
                  className="flex items-center cursor-pointer gap-2"
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