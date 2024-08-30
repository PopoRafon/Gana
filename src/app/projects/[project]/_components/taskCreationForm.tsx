import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './project.module.css';

type TaskCreationFormProps = {
    setShowTaskCreationForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type TaskCreationFormData = {
    description: string;
}

export default function TaskCreationForm({ setShowTaskCreationForm }: TaskCreationFormProps) {
    const [error, setError] = useState<boolean>(true);
    const [formData, setFormData] = useState<TaskCreationFormData>({ description: '' });
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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
