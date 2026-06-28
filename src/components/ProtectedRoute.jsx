'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GlobalLoading from '@/app/loading'; // 👈 Points to your new modern loading component

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the authentication check is done and no user exists, kick them to login
    if (!loading && !user) {
      router.push('/login');
    }
    
    // If a user exists but their role isn't in the allowed group, route them home
    if (!loading && user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.push('/');
    }
  }, [user, loading, router, allowedRoles]);

  // 1. Show your modern linear loading line while verifying state session
  if (loading) {
    return <GlobalLoading />;
  }

  // 2. Fallback protection block to prevent layout flash while redirecting unauthenticated users
  if (!user) {
    return null;
  }

  // 3. Fallback protection block if role mismatch occurs while redirecting
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  // Everything is clean and authenticated, render the page layouts safely
  return <>{children}</>;
}