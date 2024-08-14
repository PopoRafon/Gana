import { RefreshToken, AccessToken } from '@/utils/tokens';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_LIFETIME, USE_TLS } from '@/settings';

export async function POST() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refresh');

    if (!refreshToken || !RefreshToken.verify(refreshToken.value)) {
        return Response.json({
            data: 'Refresh token you provided is invalid.',
            status: 'error'
        }, { status: 401 });
    }

    const payload = AccessToken.getPayload(refreshToken.value);
    const accessToken = AccessToken.create(payload.userId);

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
