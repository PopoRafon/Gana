'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './form.module.css';
import TextInput from '@/components/form/textInput';
import PasswordInput from '@/components/form/passwordInput';
import Submit from '@/components/form/submit';
import Link from 'next/link';
import Cookies from 'js-cookie';

type LoginFormData = {
    username: string;
    password: string;
}

export default function Form() {
    const router = useRouter();
    const [error, setError] = useState<boolean>(true);
    const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });

    useEffect(() => {
        setError(!isUsernameValid() || !isPasswordValid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    function isUsernameValid(): boolean {
        if (formData.username.length < 8 || formData.username.length > 16) {
            return false;
        }

        if (!formData.username.match(/^\w+$/)) {
            return false;
        }

        return true;
    }

    function isPasswordValid(): boolean {
        if (formData.password.length < 8) {
            return false;
        }

        return true;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const csrfToken: string = Cookies.get('csrftoken') ?? '';
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json', // eslint-disable-line @typescript-eslint/naming-convention
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        });

        if (response.ok) {
            router.push('/');
        }
    }

    return (
        <form
            aria-label="Login form"
            onSubmit={handleSubmit}
            className="auth-form"
            noValidate
        >
            <TextInput
                label="Username"
                name="username"
                value={formData.username}
                handleChange={handleChange}
            />
            <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                handleChange={handleChange}
            />
            <p className={styles['account-links']}>
                <span>Forgot your <Link href="/account/recovery">password</Link>?</span>
                <span>Create an <Link href="/register">account</Link>.</span>
            </p>
            <Submit
                value="Login"
                disabled={error}
            />
        </form>
    );
}
