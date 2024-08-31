'use client';

import { useState } from 'react';
import styles from './project.module.css';
import Task from './task';
import TaskCreationForm from './taskCreationForm';
import Image from 'next/image';

type TasksProps = {
    header: string;
    type: string;
    tasks: string[];
}

export default function Tasks({ header, type, tasks }: TasksProps) {
    const [showTaskCreationForm, setShowTaskCreationForm] = useState<boolean>(false);

    return (
        <section className={styles.tasks}>
            <h3 className={styles['tasks-header']}>{header}</h3>
            <ul className={styles['tasks-list']}>
                {tasks.map((task, index) => (
                    <Task
                        task={task}
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
