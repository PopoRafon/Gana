'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import TextInput from '@/components/form/textInput';

type RegisterFormData = {
    email: string;
    username: string;
    accountType: '' | 'company' | 'personal';
    password1: string;
    password2: string;
}

export default function Form() {
    const [formData, setFormData] = useState<RegisterFormData>({ email: '', username: '', accountType: '', password1: '', password2: '' });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <form
            aria-label="Register form"
            noValidate
        >
            <TextInput
                label="Email Address"
                name="email"
                value={formData.email}
                handleChange={handleChange}
                type="email"
            />
            <TextInput
                label="Username"
                name="username"
                value={formData.username}
                handleChange={handleChange}
            />
        </form>
    );
}
