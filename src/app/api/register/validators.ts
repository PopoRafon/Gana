import prisma from '@/db/config';

type Field = undefined | string | number;

type RegisterFormData = {
    email: Field;
    username: Field;
    accountType: Field;
    password1: Field;
    password2: Field;
}

export async function isRegistrationFormValid(formData: RegisterFormData): Promise<boolean> {
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
