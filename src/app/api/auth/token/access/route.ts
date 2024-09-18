import { RefreshToken, AccessToken } from '@/utils/server/tokens';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_LIFETIME, USE_TLS } from '@/settings';

export async function POST() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refresh');

    if (!refreshToken) {
        return Response.json({
            data: 'You must be authenticated.',
            status: 'error'
        }, { status: 401 });
    }

    const verifiedRefreshToken = await RefreshToken.verify(refreshToken.value);

    if (!verifiedRefreshToken) {
        return Response.json({
            data: 'Refresh token you provided is invalid.',
            status: 'error'
        }, { status: 401 });
    }

    const accessToken = await AccessToken.create(verifiedRefreshToken.userId);

    cookieStore.set({
        name: 'access',
        value: accessToken,
        httpOnly: true,
        secure: USE_TLS,
        maxAge: ACCESS_TOKEN_LIFETIME
    });

    return Response.json({
        data: 'Your new access token has been successfully issued.',
        status: 'success'
    }, { status: 200 });
}
