'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import Submit from '@/components/form/submit';
import TextInput from '@/components/form/textInput';

type UpdateProjectFormData = {
    name: string;
}

export default function UpdateProjectForm() {
    const [error, setError] = useState<boolean>(true);
    const [formData, setFormData] = useState<UpdateProjectFormData>({ name: '' });

    useEffect(() => {
        setError(!isNameValid());
    }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

    function isNameValid(): boolean {
        return formData.name.length >= 1 && formData.name.length <= 255;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target;

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
            onSubmit={handleSubmit}
            className="auth-form"
            aria-label="Update project form"
            noValidate
        >
            <TextInput
                name="name"
                label="Name"
                handleChange={handleChange}
                value={formData.name}
            />
            <Submit
                value="Update"
                disabled={error}
            />
        </form>
    );
}
