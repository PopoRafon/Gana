'use client';

import type { Setting } from './types';
import { useEffect, useRef } from 'react';
import styles from './modal.module.css';

type SettingsModalProps = {
    settings: Setting[];
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsModal({ settings, setShowSettings }: SettingsModalProps) {
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

    return (
        <div
            className={styles.settings}
            ref={settingsRef}
        >
            {settings.map(setting => (
                <button
                    onClick={setting.handleClick}
                    className={styles['settings-button']}
                    key={setting.text}
                >
                    {setting.text}
                </button>
            ))}
        </div>
    );
}
