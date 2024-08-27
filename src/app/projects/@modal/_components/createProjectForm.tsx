'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import Submit from '@/components/form/submit';
import TextInput from '@/components/form/textInput';

type ProjectFormData = {
    name: string;
};

export default function CreateProjectForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<ProjectFormData>({ name: '' });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const csrfToken: string = await getCSRFToken();
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // eslint-disable-line @typescript-eslint/naming-convention
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            router.push('/projects');
        }
    }

    return (
        <form
            aria-label="Create project form"
            onSubmit={handleSubmit}
            className="auth-form"
            noValidate
        >
            <TextInput
                label="Name"
                name="name"
                value={formData.name}
                handleChange={handleChange}
            />
            <Submit
                value="Create"
            />
        </form>
    );
}
