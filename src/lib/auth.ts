import type { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { AccessToken } from '@/utils/server/tokens';
import prisma from './db';

export async function authenticate(): Promise<User | null> {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access');

    if (!accessToken || !AccessToken.verify(accessToken.value)) {
        return null;
    }

    const { userId } = AccessToken.getPayload(accessToken.value);
    const user = await prisma.user.findFirst({ where: { id: userId } });

    return user;
}
