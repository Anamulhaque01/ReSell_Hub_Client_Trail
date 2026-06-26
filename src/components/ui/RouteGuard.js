'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RouteGuard({ children, allowedRoles = [] }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                router.push('/'); // Bounce users out if role configurations don't fit permissions
            }
        }
    }, [user, loading, router, allowedRoles]);

    if (loading || !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-secondary"></div>
            </div>
        );
    }

    return children;
}