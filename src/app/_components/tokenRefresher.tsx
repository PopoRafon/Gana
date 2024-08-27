'use client';

import { AccessToken } from '@/utils/client/tokenRefresh';
import { useEffect } from 'react';
import { useUserContext } from '@/contexts/user/userContext';

export default function TokenRefresher() {
    const { user } = useUserContext();

    useEffect(() => {
        if (user.isAuthenticated) {
            AccessToken.setPeriodicRefresh();
            AccessToken.refresh();
        } else if (!user.isAuthenticated) {
            AccessToken.removePeriodicRefresh();
        }
    }, [user]);

    return null;
}
