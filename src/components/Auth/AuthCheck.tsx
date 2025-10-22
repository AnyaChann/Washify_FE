'use client';

import { useAuthStore } from '@/store/auth.store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/auth/sign-in', '/auth/sign-out', '/unauthorized'];

export function AuthCheck({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const lastCheckedPath = useRef<string>('');

  useEffect(() => {
    // Don't re-check same path
    if (lastCheckedPath.current === pathname) {
      return;
    }
    
    // Skip auth check for public routes
    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
    if (isPublicRoute) {
      lastCheckedPath.current = pathname;
      return;
    }

    // If not authenticated, redirect to sign-in (only once)
    if (!isAuthenticated || !user) {
      if (lastCheckedPath.current !== '/auth/sign-in') {
        lastCheckedPath.current = '/auth/sign-in';
        router.replace('/auth/sign-in');
      }
      return;
    }

    // Check if user has valid role
    const validRoles = ['ADMIN', 'MANAGER', 'STAFF'];
    if (!validRoles.includes(user.role)) {
      if (lastCheckedPath.current !== '/unauthorized') {
        lastCheckedPath.current = '/unauthorized';
        router.replace('/unauthorized');
      }
      return;
    }

    // Mark this path as checked
    lastCheckedPath.current = pathname;
  }, [pathname, isAuthenticated, user, router]);

  // Show content immediately
  return <>{children}</>;
}
