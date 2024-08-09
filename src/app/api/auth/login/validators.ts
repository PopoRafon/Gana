import prisma from '@/db/config';

type LoginFormData = {
    username: undefined | string | number;
    password: undefined | string | number;
}

export async function isLoginFormValid(formData: LoginFormData): Promise<boolean> {
    const { username, password } = formData;

    if (typeof username !== 'string') {
        return false;
    }

    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
        return false;
    }

    if (typeof password !== 'string' ||
        password !== user.password
    ) {
        return false;
    }

    return true;
}
