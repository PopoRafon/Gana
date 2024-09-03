'use client';

import type { ClientTask } from './types';
import type { DragEvent } from 'react';
import { useState } from 'react';
import styles from './project.module.css';
import Task from './task';
import TaskCreationForm from './taskCreationForm';
import Image from 'next/image';

type TasksProps = {
    header: string;
    type: string;
    tasks: ClientTask[];
}

export default function Tasks({ header, type, tasks }: TasksProps) {
    const [showTaskCreationForm, setShowTaskCreationForm] = useState<boolean>(false);

    function handleDragEnter(event: DragEvent<HTMLElement>) {
        event.currentTarget.setAttribute('style', 'outline: 2px solid blue;');
    }

    function handleDragLeave(event: DragEvent<HTMLElement>) {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            event.currentTarget.removeAttribute('style');
        }
    }

    function handleDrop(event: DragEvent<HTMLLIElement>) {
        event.currentTarget.removeAttribute('style');

        try {
            JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch {
            return;
        }
    }

    return (
        <section
            className={styles.tasks}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
        >
            <h3 className={styles['tasks-header']}>{header}</h3>
            <ul className={styles['tasks-list']}>
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        type={type}
                        key={index}
                    />
                ))}
            </ul>
            <div>
                {showTaskCreationForm ? (
                    <TaskCreationForm
                        setShowTaskCreationForm={setShowTaskCreationForm}
                        type={type}
                    />
                ) : (
                    <button
                        className={styles['create-task-button']}
                        onClick={() => setShowTaskCreationForm(true)}
                    >
                        <Image
                            src="/images/icons/add.svg"
                            width={14}
                            height={14}
                            alt="Add task image"
                        />
                        <span>Create task</span>
                    </button>
                )}
            </div>
        </section>
    );
}
