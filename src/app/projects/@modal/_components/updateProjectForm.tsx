'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Submit from '@/components/form/submit';
import TextInput from '@/components/form/textInput';

type UpdateProjectFormData = {
    name: string;
}

export default function UpdateProjectForm() {
    const router = useRouter();
    const params = useSearchParams();
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

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const projectId = params.get('project-id');
        const csrfToken: string = await getCSRFToken();
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'PATCH',
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
            router.push('/projects');
        }
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
