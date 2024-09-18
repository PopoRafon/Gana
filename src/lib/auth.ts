import type { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { AccessToken } from '@/utils/server/tokens';
import prisma from './db';

export async function authenticate(): Promise<User | null> {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access');

    if (!accessToken) {
        return null;
    }

    const verifiedAccessToken = await AccessToken.verify(accessToken.value);

    if (!verifiedAccessToken) {
        return null;
    }

    const user = await prisma.user.findFirst({
        where: {
            id: verifiedAccessToken.userId
        }
    });

    return user;
}
