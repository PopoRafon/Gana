'use client';

import type { FormEvent } from 'react';
import styles from './modal.module.css';
import Submit from '@/components/form/submit';

export default function DeleteProjectForm() {
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="auth-form"
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
