'use client';

import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  readonly children: React.ReactNode;
  readonly allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated || !user) {
      router.push('/auth/sign-in');
      return;
    }

    // Check role authorization
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
      return;
    }

    setIsChecking(false);
  }, [isAuthenticated, user, allowedRoles, router]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
