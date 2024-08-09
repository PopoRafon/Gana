import { cookies } from 'next/headers';
import { createAccessToken, createRefreshToken } from '@/utils/tokens';
import { isRegistrationFormValid } from './validators';
import prisma from '@/db/config';

export async function POST(request: Request) {
    const formData = await request.json();

    if (!await isRegistrationFormValid(formData)) {
        return Response.json({
            data: 'Credentials you provided are incorrect.',
            status: 'error'
        }, { status: 400 });
    }

    const user = await prisma.user.create({
        data: {
            email: formData.email,
            username: formData.username,
            accountType: formData.accountType,
            password: formData.password1
        }
    });

    const cookieStore = cookies();
    const accessToken = await createAccessToken(user.id);
    const refreshToken = await createRefreshToken(user.id);

    cookieStore.set({
        name: 'access',
        value: accessToken,
        httpOnly: true
    });

    cookieStore.set({
        name: 'refresh',
        value: refreshToken,
        httpOnly: true
    });

    return Response.json({
        data: 'Your account has been successfully created.',
        status: 'success'
    }, { status: 200 });
}
