"use client";

import supabase from "@/services/supabaseClient";
import { useEffect, useState, useContext, createContext, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoBlue from "@/public/rolecall-logo-blue.png";

// Create the auth context for the dashboard
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Use refs to track current values for logging
  const userRef = useRef(user);
  const loadingRef = useRef(loading);
  const authCheckedRef = useRef(authChecked);

  // Update refs when state changes
  useEffect(() => { userRef.current = user; }, [user]);
  useEffect(() => { loadingRef.current = loading; }, [loading]);
  useEffect(() => { authCheckedRef.current = authChecked; }, [authChecked]);

  // Debug logging helper (disabled for production)
  const logState = (context, additionalInfo = {}) => {
  };

  useEffect(() => {
    logState('INIT', { action: 'useEffect started' });
    
    // Set a maximum timeout for auth check to prevent infinite loading
    const authTimeout = setTimeout(() => {
      console.warn('🔐 AuthProvider: Auth check timeout - forcing completion');
      logState('TIMEOUT', { action: 'forcing completion' });
      setLoading(false);
      setAuthChecked(true);
    }, 10000); // 10 second timeout

    createNewUser().finally(() => {
      clearTimeout(authTimeout);
      logState('CREATE_USER_COMPLETE');
    });
    
    // Listen for auth state changes (sign in/out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        
        if (event === 'SIGNED_OUT' || !session) {
          // User signed out or session expired
          logState('SIGNED_OUT', { event });
          setUser(null);
          setLoading(false);
          setAuthChecked(true);
          // Redirect to home page when signed out
          router.replace('/');
        } else if (event === 'SIGNED_IN') {
          // Check using refs to get current state values
          const currentUser = userRef.current;
          const currentAuthChecked = authCheckedRef.current;
          
          logState('SIGNED_IN', { 
            event, 
            sessionUserEmail: session.user?.email, 
            currentUserEmail: currentUser?.email,
            alreadyAuthChecked: currentAuthChecked
          });
          
          // Skip if we already have the same user and auth is checked
          if (currentUser?.email === session.user?.email && currentAuthChecked) {
            return;
          }
          
          if (!currentUser || currentUser.email !== session.user?.email) {
            await refreshUserData(session.user);
          } else {
          }
          
          setAuthChecked(true);
          setLoading(false);
          logState('SIGNED_IN_COMPLETE', { event });
        } else if (event === 'TOKEN_REFRESHED') {
          logState('TOKEN_REFRESHED_START', { 
            event, 
            hasUser: !!user, 
            sessionUser: session?.user?.email 
          });
          
          // Don't reload user data on token refresh, just update auth state
          if (!user && session?.user) {
            // Only refresh if we don't have user data
            await refreshUserData(session.user);
          }
          // Always ensure auth state is stable after token refresh
          if (authChecked === false) {
            setAuthChecked(true);
          }
          if (loading === true) {
            setLoading(false);
          }
          
          logState('TOKEN_REFRESHED_END', { event });
        }
      }
    );

    // Cleanup subscription and timeout on unmount
    return () => {
      subscription?.unsubscribe();
      clearTimeout(authTimeout);
    };
  }, []);
  
  // Separate function for refreshing user data without always setting loading
  const refreshUserData = async (authUser) => {
    try {
      if (!authUser) return;
      
      // User is authenticated, get their profile
      const { data: users, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("email", authUser.email);

      if (dbError) {
        console.error("Database error:", dbError);
        return;
      }

      if (users?.length === 0) {
        // Create new user record
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              email: authUser.email,
              name: authUser.user_metadata?.name,
              image_url: authUser.user_metadata?.picture,
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Insert error:", insertError);
          return;
        }
        setUser(newUser);
      } else {
        setUser(users[0]);
      }
    } catch (error) {
      console.error("Unexpected error in refreshUserData:", error);
    }
  };

  const createNewUser = async () => {
    try {
      setLoading(true);
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("Auth error:", authError);
        setUser(null);
        return;
      }

      if (!authUser) {
        setUser(null);
        return;
      }

      // Use the separate refresh function
      await refreshUserData(authUser);
    } catch (error) {
      console.error("Unexpected error in createNewUser:", error);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  // Redirect to home if not authenticated after auth check
  useEffect(() => {
    if (authChecked && !user) {
      router.replace('/');
    }
  }, [user, authChecked, router]);

  // Show loading state while checking authentication
  if (loading || !authChecked) {
    return <AuthLoadingScreen />;
  }

  // If no user after auth check, show loading while redirect is in progress
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, render the protected content
  return (
    <AuthContext.Provider value={{ user, setUser, loading, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
}

function AuthLoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* Logo Loading */}
        <div className="flex justify-center">
          <div className="p-4 bg-secondary border border-border rounded-xl">
            <Image
              src={logoBlue}
              alt="RoleCall Logo"
              width={120}
              height={60}
              className="w-[120px] h-[60px] object-contain"
            />
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Loading RoleCall</h2>
          <p className="text-muted-foreground">Verifying your access...</p>
        </div>
        
        {/* Loading Skeletons */}
        <div className="space-y-3">
          <div className="h-4 w-3/4 mx-auto bg-accent rounded animate-pulse"></div>
          <div className="h-4 w-1/2 mx-auto bg-accent rounded animate-pulse"></div>
          <div className="h-4 w-2/3 mx-auto bg-accent rounded animate-pulse"></div>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default AuthProvider;

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};