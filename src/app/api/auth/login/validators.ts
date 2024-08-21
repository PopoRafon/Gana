import type { Field } from '@/app/api/types/types';
import Password from '@/utils/server/password';
import prisma from '@/lib/db';

type LoginFormData = {
    username: Field;
    password: Field;
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
        !await Password.verify(user.password, password)
    ) {
        return false;
    }

    return true;
}
