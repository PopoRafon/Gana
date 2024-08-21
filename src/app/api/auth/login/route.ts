import type { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { isLoginFormValid } from './validators';
import { RefreshToken, AccessToken } from '@/utils/server/tokens';
import { REFRESH_TOKEN_LIFETIME, ACCESS_TOKEN_LIFETIME, USE_TLS } from '@/settings';
import prisma from '@/lib/db';

export async function POST(request: Request) {
    const formData = await request.json();

    if (!await isLoginFormValid(formData)) {
        return Response.json({
            data: 'Credentials you provided are incorrect.',
            status: 'error'
        }, { status: 400 });
    }

    const cookieStore = cookies();
    const user = await prisma.user.findFirst({ where: { username: formData.username } }) as User;
    const refreshToken = RefreshToken.create(user.id);
    const accessToken = AccessToken.create(user.id);

    cookieStore.set({
        name: 'refresh',
        value: refreshToken,
        httpOnly: true,
        secure: USE_TLS,
        maxAge: REFRESH_TOKEN_LIFETIME
    });

    cookieStore.set({
        name: 'access',
        value: accessToken,
        httpOnly: true,
        secure: USE_TLS,
        maxAge: ACCESS_TOKEN_LIFETIME
    });

    return Response.json({
        data: 'You have been successfully authenticated.',
        status: 'success'
    }, { status: 200 });
}
