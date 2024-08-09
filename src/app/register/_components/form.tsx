'use client';

import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/userContext';
import styles from './form.module.css';
import Email from './email';
import Username from './username';
import Password from './password';

type RegisterFormData = {
    email: string;
    username: string;
    accountType: '' | 'company' | 'personal';
    password1: string;
    password2: string;
}

async function sendForm(formData: RegisterFormData): Promise<undefined | object> {
    const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json' // eslint-disable-line @typescript-eslint/naming-convention
        }
    });

    if (!response.ok) return undefined;
    return response.json();
}

export default function Form() {
    const router = useRouter();
    const { setUser } = useUserContext();
    const [formData, setFormData] = useState<RegisterFormData>({ email: '', username: '', accountType: '', password1: '', password2: '' });
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

        const user = await sendForm(formData);

        if (user) {
            setUser({
                isAuthenticated: true,
                email: formData.email,
                username: formData.username,
                accountType: formData.accountType
            });
            router.push('/');
        }
    }

    return (
        <form
            aria-label="Register form"
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            {showField === 'email' && (
                <Email
                    email={formData.email}
                    handleChange={handleChange}
                />
            )}
            {showField === 'username' && (
                <Username
                    username={formData.username}
                    accountType={formData.accountType}
                    handleChange={handleChange}
                />
            )}
            {showField === 'password' && (
                <Password
                    password1={formData.password1}
                    password2={formData.password2}
                    handleChange={handleChange}
                />
            )}
        </form>
    );
}
