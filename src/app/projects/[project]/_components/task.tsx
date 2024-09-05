import type { ClientTask } from './types';
import type { DragEvent } from 'react';
import { useState } from 'react';
import styles from './project.module.css';
import Image from 'next/image';
import TaskSettings from './taskSettings';

type TaskProps = {
    task: ClientTask;
    type: string;
}

export default function Task({ task, type }: TaskProps) {
    const [showSettings, setShowSettings] = useState<boolean>(false);

    function handleDragStart(event: DragEvent<HTMLLIElement>) {
        const data: Record<string, string | number> = {
            type,
            taskId: task.id
        };

        event.dataTransfer.setData('text/plain', JSON.stringify(data));
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
                    <TaskSettings
                        setShowSettings={setShowSettings}
                    />
                )}
            </div>
        </li>
    );
}
