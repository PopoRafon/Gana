'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';
import SelectInput from '@/components/form/selectInput';

type AddUserFormData = {
    username: string;
    role: 'admin' | 'member';
}

type AddUserFormProps = {
    projectId: string;
}

const options = [
    { text: 'Member', value: 'member' },
    { text: 'Administrator', value: 'admin' }
];

export default function AddUserForm({ projectId }: AddUserFormProps) {
    const router = useRouter();
    const params = useParams();
    const [formData, setFormData] = useState<AddUserFormData>({ username: '', role: 'member' });
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isUsernameValid());
    }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

    function isUsernameValid(): boolean {
        if (formData.username.length < 1) {
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

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const csrfToken: string = await getCSRFToken();
        const response = await fetch(`/api/projects/${params.project}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // eslint-disable-line @typescript-eslint/naming-convention
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            router.push(`/projects/${projectId}`);
            router.refresh();
        }
    }

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit}
            aria-label="Add user form"
            noValidate
        >
            <TextInput
                label="Username"
                name="username"
                value={formData.username}
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
