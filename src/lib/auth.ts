import type { User } from '@prisma/client';
import { cookies, headers } from 'next/headers';
import { AccessToken } from '@/utils/server/tokens';
import prisma from './db';

export async function authenticate(): Promise<User | null> {
    const cookieStore = cookies();
    let accessToken: string | undefined = cookieStore.get('access')?.value;

    if (!accessToken) {
        const headersList = headers();
        const setCookieHeader = headersList.get('set-cookie');

        if (!setCookieHeader) {
            return null;
        }

        accessToken = setCookieHeader.match(/access=([\w-.]+)/)?.[1];

        if (!accessToken) {
            return null;
        }
    }

    const verifiedAccessToken = await AccessToken.verify(accessToken);

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
