'use client';

import styles from './projects.module.css';

export default function CreateProjectButton() {
    async function handleProjectCreation() {

    }

    return (
        <button
            onClick={handleProjectCreation}
            className={styles['create-project-button']}
        >
            Create Project
        </button>
    );
}
