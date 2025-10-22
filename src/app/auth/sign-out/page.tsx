'use client';

import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOutPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();
    router.push('/auth/sign-in');
  }, [logout, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
        <p className="text-lg text-gray-600 dark:text-gray-400">Signing out...</p>
      </div>
    </div>
  );
}
