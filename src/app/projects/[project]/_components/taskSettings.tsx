import { useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import styles from './project.module.css';

type TaskSettingsProps = {
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
    taskId: number;
}

export default function TaskSettings({ setShowSettings, taskId }: TaskSettingsProps) {
    const { project } = useParams();
    const router = useRouter();
    const settingsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickEvent = (event: globalThis.MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setShowSettings(false);
            }
        };

        document.addEventListener('click', clickEvent);

        return () => {
            document.removeEventListener('click', clickEvent);
        };
    }, [setShowSettings]);

    async function handleDeletion() {
        const csrfToken: string = await getCSRFToken();
        const response = await fetch(`/api/projects/${project}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        });

        if (response.ok) {
            setShowSettings(false);
            router.refresh();
        }
    }

    return (
        <div
            className={styles['task-settings']}
            ref={settingsRef}
        >
            <button
                className={styles['task-settings-button']}
                onClick={handleDeletion}
            >
                Delete
            </button>
        </div>
    );
}
