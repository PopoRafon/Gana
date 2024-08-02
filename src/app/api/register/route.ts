import { cookies } from 'next/headers';
import { createAccessToken, createRefreshToken } from '@/utils/tokens';
import prisma from '@/db/config';

type Field = undefined | string | number;

type RegisterFormData = {
    email: Field;
    username: Field;
    accountType: Field;
    password1: Field;
    password2: Field;
}

async function isRegistrationFormValid(formData: RegisterFormData): Promise<boolean> {
    const { email, username, accountType, password1, password2 } = formData;

    if (typeof email !== 'string' ||
        !email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/) ||
        await prisma.user.findFirst({ where: { email } })
    ) {
        return false;
    }

    if (typeof username !== 'string' ||
        !username.match(/^\w+$/) ||
        username.length < 8 ||
        username.length > 16 ||
        await prisma.user.findFirst({ where: { username } })
    ) {
        return false;
    }

    if (typeof accountType !== 'string' ||
        (accountType !== 'business' && accountType !== 'personal')
    ) {
        return false;
    }

    if (typeof password1 !== 'string' ||
        password1.length < 8 ||
        password1.length > 32
    ) {
        return false;
    }

    if (typeof password2 !== 'string' ||
        password1 !== password2
    ) {
        return false;
    }

    return true;
}

export async function POST(request: Request) {
    const formData = await request.json();

    if (!await isRegistrationFormValid(formData)) {
        return Response.json({
            data: 'Credentials you provided are incorrect.',
            status: 'error'
        }, { status: 400 });
    }

    await prisma.user.create({
        data: {
            email: formData.email,
            username: formData.username,
            accountType: formData.accountType,
            password: formData.password1
        }
    });

    const cookieStore = cookies();
    const accessToken = await createAccessToken();
    const refreshToken = await createRefreshToken();

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
