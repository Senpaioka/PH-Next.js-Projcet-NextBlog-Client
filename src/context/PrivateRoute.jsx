'use client'; 

import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login with return url
      router.push(`/auth/login`);
    }
  }, [user, isLoading, router]);

  // if (isLoading) return <p>loading</p>;
  if (isLoading) {
    return <p className="text-center p-10 text-xl font-semibold">Loading...</p>;
  }

  if (user) return children;
}

export default  PrivateRoute ;