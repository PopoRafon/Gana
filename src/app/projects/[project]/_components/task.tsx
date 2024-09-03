import type { ClientTask } from './types';
import type { DragEvent } from 'react';
import styles from './project.module.css';
import Image from 'next/image';

type TaskProps = {
    task: ClientTask;
    type: string;
}

export default function Task({ task, type }: TaskProps) {
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
            <button
                className={styles['task-settings']}
            >
                <Image
                    src="/images/icons/settings.svg"
                    width={16}
                    height={16}
                    alt="Settings image"
                    draggable={false}
                />
            </button>
        </li>
    );
}
