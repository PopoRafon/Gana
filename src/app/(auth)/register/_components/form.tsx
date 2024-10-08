'use client';

import type { FormEvent, ChangeEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from './types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/user/userContext';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import Email from './email';
import Username from './username';
import Password from './password';

export default function Form() {
    const { setUser } = useUserContext();
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterFormData>({ email: '', username: '', accountType: '', password1: '', password2: '' });
    const [formErrors, setFormErrors] = useState<RegisterFormErrors>({ email: '', username: '', accountType: '', password1: '', password2: '' });
    const [showField, setShowField] = useState<'email' | 'username' | 'password'>('email');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (showField === 'email') {
            setShowField('username');
            return;
        }

        if (showField === 'username') {
            setShowField('password');
            return;
        }

        const csrfToken: string = await getCSRFToken();
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json', // eslint-disable-line @typescript-eslint/naming-convention
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        });

        if (response.ok) {
            const userDataResponse = await fetch('/api/users', {
                method: 'GET'
            });

            if (userDataResponse.ok) {
                setUser({
                    isAuthenticated: true,
                    ...(await userDataResponse.json()).data
                });
            }

            router.push('/');
        } else {
            setFormErrors(await response.json());
        }
    }

    return (
        <form
            aria-label="Register form"
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
        >
            {showField === 'email' && (
                <Email
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
                />
            )}
            {showField === 'username' && (
                <Username
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
                />
            )}
            {showField === 'password' && (
                <Password
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
                />
            )}
        </form>
    );
}
