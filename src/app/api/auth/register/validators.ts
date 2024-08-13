import type { Field } from '@/app/api/types/types';
import prisma from '@/lib/db';

type RegisterFormData = {
    email: Field;
    username: Field;
    accountType: Field;
    password1: Field;
    password2: Field;
}

type RegisterFormErrors = {
    email: string;
    username: string;
    accountType: string;
    password1: string;
    password2: string;
}

export async function validateRegistrationForm(formData: RegisterFormData): Promise<RegisterFormErrors> {
    const { email, username, accountType, password1, password2 } = formData;
    const formErrors: RegisterFormErrors = { email: '', username: '', accountType: '', password1: '', password2: '' };

    if (typeof email !== 'string') {
        formErrors.email = 'Email address mustn\'t be empty.';
    } else if (!email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
        formErrors.email = 'Email address is not valid.';
    } else if (await prisma.user.findFirst({ where: { email } })) {
        formErrors.email = 'User with that email address already exists.';
    }

    if (typeof username !== 'string') {
        formErrors.username = 'Username mustn\'t be empty.';
    } else if (!username.match(/^\w+$/)) {
        formErrors.username = 'Username must contain only alphabet and numbers.';
    } else if (username.length < 8) {
        formErrors.username = 'Username mustn\'t be shorter than 8 characters.';
    } else if (username.length > 16) {
        formErrors.username = 'Username mustn\'t be longer than 16 characters.';
    } else if (await prisma.user.findFirst({ where: { username } })) {
        formErrors.username = 'User with that username already exists.';
    }

    if (typeof accountType !== 'string') {
        formErrors.accountType = 'Account type mustn\'t be empty.';
    } else if (accountType !== 'company' && accountType !== 'personal') {
        formErrors.accountType = 'Account type must be either "personal" or "company".';
    }

    if (typeof password1 !== 'string') {
        formErrors.password1 = 'Password mustn\'t be empty.';
    } else if (password1.length < 8) {
        formErrors.password1 = 'Password mustn\'t be shorter than 8 characters.';
    } else if (password1.length > 32) {
        formErrors.password1 = 'Password mustn\'t be longer than 32 characters.';
    }

    if (typeof password2 !== 'string') {
        formErrors.password2 = 'Password confirmation mustn\'t be empty.';
    } else if (password1 !== password2) {
        formErrors.password2 = 'Password confirmation and password must match.';
    }

    return formErrors;
}
