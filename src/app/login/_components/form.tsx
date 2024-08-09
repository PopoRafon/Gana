'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import styles from './form.module.css';
import TextInput from '@/components/form/textInput';
import PasswordInput from '@/components/form/passwordInput';
import Submit from '@/components/form/submit';
import Link from 'next/link';

type LoginFormData = {
    username: string;
    password: string;
}

export default function Form() {
    const [error] = useState<boolean>(true);
    const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
