'use client';

import { AccessToken } from '@/utils/client/tokenRefresh';
import { useEffect } from 'react';

export default function TokenRefresher() {
    useEffect(() => {
        AccessToken.setPeriodicRefresh();
        AccessToken.refresh();
    }, []);

    return null;
}
