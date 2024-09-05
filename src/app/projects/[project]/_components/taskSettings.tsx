import { useRef, useEffect } from 'react';
import styles from './project.module.css';

type TaskSettingsProps = {
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskSettings({ setShowSettings }: TaskSettingsProps) {
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

    function handleDeletion() {

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
