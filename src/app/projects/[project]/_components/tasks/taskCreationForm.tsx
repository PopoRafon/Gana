import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import { useParams, useRouter } from 'next/navigation';
import styles from './tasks.module.css';

type TaskCreationFormProps = {
    setShowTaskCreationForm: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
}

type TaskCreationFormData = {
    description: string;
    status: string;
}

export default function TaskCreationForm({ setShowTaskCreationForm, type }: TaskCreationFormProps) {
    const router = useRouter();
    const params = useParams();
    const [error, setError] = useState<boolean>(true);
    const [formData, setFormData] = useState<TaskCreationFormData>({ description: '', status: type });
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        setError(!isDescriptionValid());
    }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const eventListener = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setShowTaskCreationForm(false);
            }
        };

        document.addEventListener('click', eventListener);

        return () => {
            document.removeEventListener('click', eventListener);
        };
    }, [setShowTaskCreationForm]);

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const csrfToken: string = await getCSRFToken();
        const projectId = params.project;
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // eslint-disable-line @typescript-eslint/naming-convention
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setShowTaskCreationForm(false);
            router.refresh();
        }
    }

    function isDescriptionValid(): boolean {
        return formData.description.length > 0 && formData.description.length <= 255;
    }

    return (
        <form
            ref={formRef}
            className={styles['task-creation-form']}
            aria-label="Task creation form"
            onSubmit={handleSubmit}
            noValidate
        >
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles['task-creation-form-input']}
                rows={2}
                autoFocus
            />
            <input
                className={styles['task-creation-form-submit-button']}
                type="submit"
                disabled={error}
                value="Create"
            />
        </form>
    );
}
