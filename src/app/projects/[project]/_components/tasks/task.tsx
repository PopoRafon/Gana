import type { ClientTask } from './types';
import type { DragEvent } from 'react';
import type { Setting } from '@/components/modal/types';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import styles from './tasks.module.css';
import Image from 'next/image';
import SettingsModal from '@/components/modal/settingsModal';

type TaskProps = {
    task: ClientTask;
    type: string;
}

export default function Task({ task, type }: TaskProps) {
    const { project } = useParams();
    const router = useRouter();
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const settings: Setting[] = [{ text: 'Delete', handleClick: handleDelete }];

    function handleDragStart(event: DragEvent<HTMLLIElement>) {
        const data: Record<string, string | number> = {
            type,
            taskId: task.id
        };

        event.dataTransfer.setData('text/plain', JSON.stringify(data));
    }

    async function handleDelete() {
        const csrfToken: string = await getCSRFToken();
        const response = await fetch(`/api/projects/${project}/tasks/${task.id}`, {
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
        <li
            className={styles.task}
            onDragStart={handleDragStart}
            draggable={true}
        >
            <span>{task.description}</span>
            <div className={styles['task-open-settings-container']}>
                <button
                    className={styles['task-open-settings-button']}
                    onClick={() => setShowSettings(true)}
                >
                    <Image
                        src="/images/icons/settings.svg"
                        width={16}
                        height={16}
                        alt="Settings image"
                        draggable={false}
                    />
                </button>
                {showSettings && (
                    <SettingsModal
                        settings={settings}
                        setShowSettings={setShowSettings}
                    />
                )}
            </div>
        </li>
    );
}
