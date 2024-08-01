'use client';

import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
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

export default function Form() {
    const [formData, setFormData] = useState<RegisterFormData>({ email: '', username: '', accountType: '', password1: '', password2: '' });
    const [showField, setShowField] = useState<'email' | 'username' | 'password'>('email');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (showField === 'email') {
            setShowField('username');
            return;
        }

        if (showField === 'username') {
            setShowField('password');
            return;
        }

        // TODO: Send request to backend with formData
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
