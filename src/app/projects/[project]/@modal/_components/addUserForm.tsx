'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';
import SelectInput from '@/components/form/selectInput';

type AddUserFormData = {
    user: string;
    role: 'admin' | 'member';
}

const options = [
    { text: 'Member', value: 'member' },
    { text: 'Administrator', value: 'admin' }
];

export default function AddUserForm() {
    const [formData, setFormData] = useState<AddUserFormData>({ user: '', role: 'member' });
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isUserValid());
    }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

    function isUserValid(): boolean {
        if (formData.user.length < 1) {
            return false;
        }

        return true;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit}
            aria-label="Add user form"
            noValidate
        >
            <TextInput
                label="Username or Email Address"
                name="user"
                value={formData.user}
                handleChange={handleChange}
            />
            <SelectInput
                label="Role"
                name="role"
                value={formData.role}
                handleChange={handleChange}
                options={options}
            />
            <Submit
                value="Add User"
                disabled={error}
            />
        </form>
    );
}
