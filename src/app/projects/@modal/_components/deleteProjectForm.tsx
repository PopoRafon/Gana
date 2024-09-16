'use client';

import type { FormEvent } from 'react';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './modal.module.css';
import Submit from '@/components/form/submit';

export default function DeleteProjectForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const projectId = searchParams.get('project-id');
        const csrfToken: string = await getCSRFToken();
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
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
            aria-label="Delete project form"
            noValidate
        >
            <div>
                <p className={styles['project-deletion-information']}>Do you want to delete this project?</p>
                <p className={styles['project-deletion-caution']}>(this action is irreversible)</p>
            </div>
            <Submit
                value="Delete"
                type="danger"
            />
        </form>
    );
}
