import { cookies } from 'next/headers';
import { AccessToken, RefreshToken } from '@/utils/server/tokens';
import { validateRegistrationForm } from './validators';
import { REFRESH_TOKEN_LIFETIME, ACCESS_TOKEN_LIFETIME, USE_TLS } from '@/settings';
import Password from '@/utils/server/password';
import prisma from '@/lib/db';

export async function POST(request: Request) {
    const formData = await request.json();
    const formErrors = await validateRegistrationForm(formData);

    if (Object.values(formErrors).some(error => error.length !== 0)) {
        return Response.json({
            data: formErrors,
            status: 'error'
        }, { status: 400 });
    }

    const passwordHash = await Password.hash(formData.password1);
    const user = await prisma.user.create({
        data: {
            email: formData.email,
            username: formData.username,
            accountType: formData.accountType,
            password: passwordHash
        }
    });

    const cookieStore = cookies();
    const accessToken = AccessToken.create(user.id);
    const refreshToken = RefreshToken.create(user.id);

    cookieStore.set({
        name: 'access',
        value: accessToken,
        httpOnly: true,
        secure: USE_TLS,
        maxAge: ACCESS_TOKEN_LIFETIME
    });

    cookieStore.set({
        name: 'refresh',
        value: refreshToken,
        httpOnly: true,
        secure: USE_TLS,
        maxAge: REFRESH_TOKEN_LIFETIME
    });

    return Response.json({
        data: 'Your account has been successfully created.',
        status: 'success'
    }, { status: 200 });
}
