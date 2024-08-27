'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import Submit from '@/components/form/submit';
import TextInput from '@/components/form/textInput';

type ProjectFormData = {
    name: string;
};

export default function CreateProjectForm() {
    const router = useRouter();
    const isSending = useRef<boolean>(false);
    const [error, setError] = useState<boolean>(true);
    const [formData, setFormData] = useState<ProjectFormData>({ name: '' });

    useEffect(() => {
        setError(!isNameValid());
    }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

    function isNameValid(): boolean {
        return formData.name.length >= 1 && formData.name.length <= 255;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!isSending.current) {
            isSending.current = true;
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
                router.refresh();
            } else {
                isSending.current = false;
            }
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
                disabled={error}
            />
        </form>
    );
}
