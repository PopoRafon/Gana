import { cookies } from 'next/headers';
import { AccessToken, RefreshToken } from '@/utils/tokens';
import { validateRegistrationForm } from './validators';
import Password from '@/utils/password';
import prisma from '@/db/config';

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
