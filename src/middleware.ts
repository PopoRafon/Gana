import { cookies } from 'next/headers';
import { RefreshToken, AccessToken } from './utils/server/tokens';
import { NextResponse } from 'next/server';
import { ACCESS_TOKEN_LIFETIME, USE_TLS } from './settings';

const safeMethods: string[] = ['GET', 'HEAD', 'OPTIONS'];

export async function middleware(request: Request) {
    const cookieStore = cookies();
    const response = NextResponse.next();

    if (!safeMethods.includes(request.method)) {
        const headers = request.headers;
        const csrfToken1 = cookieStore.get('csrftoken');
        const csrfToken2 = headers.get('X-CSRFToken');

        if (!csrfToken1 || !csrfToken2 || csrfToken1.value !== csrfToken2) {
            return Response.json({
                data: 'CSRF token has not been set.',
                status: 'error'
            }, { status: 403 });
        }
    }

    const refreshToken = cookieStore.get('refresh');
    const accessToken = cookieStore.get('access');

    if (refreshToken && !accessToken) {
        const verifiedRefreshToken = await RefreshToken.verify(refreshToken.value);

        if (verifiedRefreshToken) {
            const newAccessToken = await AccessToken.create(verifiedRefreshToken.userId);

            response.cookies.set('access', newAccessToken, {
                maxAge: ACCESS_TOKEN_LIFETIME,
                httpOnly: true,
                secure: USE_TLS
            });
        }
    }

    return response;
}

export const config = {
    matcher: ['/:path*']
};
