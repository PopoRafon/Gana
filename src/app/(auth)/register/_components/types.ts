export type RegisterFormData = {
    email: string;
    username: string;
    accountType: '' | 'company' | 'personal';
    password1: string;
    password2: string;
}

export type RegisterFormErrors = {
    email: string;
    username: string;
    accountType: string;
    password1: string;
    password2: string;
}
