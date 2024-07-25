'use client';

import type { ChangeEvent, FormEvent } from 'react';
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
    const [showEmail, setShowEmail] = useState<boolean>(true);
    const [showUsername, setShowUsername] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (showEmail) {
            // Validate Email
            setShowEmail(false);
            setShowUsername(true);
            return;
        }

        if (showUsername) {
            // Validate Username
            setShowUsername(false);
            setShowPassword(true);
            return;
        }

        if (showPassword) {
            // Validate Password
            return;
        }

        // Send Request
    }

    return (
        <form
            aria-label="Register form"
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            {showEmail && (
                <Email
                    email={formData.email}
                    handleChange={handleChange}
                />
            )}
            {showUsername && (
                <Username
                    username={formData.username}
                    handleChange={handleChange}
                />
            )}
            {showPassword && (
                <Password
                    password1={formData.password1}
                    password2={formData.password2}
                    handleChange={handleChange}
                />
            )}
        </form>
    );
}
