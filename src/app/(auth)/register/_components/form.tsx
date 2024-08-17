'use client';

import type { FormEvent, ChangeEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from './types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Email from './email';
import Username from './username';
import Password from './password';
import Cookies from 'js-cookie';

export default function Form() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterFormData>({ email: '', username: '', accountType: '', password1: '', password2: '' });
    const [formErrors, setFormErrors] = useState<RegisterFormErrors>({ email: '', username: '', accountType: '', password1: '', password2: '' });
    const [showField, setShowField] = useState<'email' | 'username' | 'password'>('email');

    useEffect(() => {
        fetch('/api/auth/token/csrf');
    }, []);

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

        const csrfToken = Cookies.get('csrftoken') as string;
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json', // eslint-disable-line @typescript-eslint/naming-convention
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        });

        if (response.ok) {
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
