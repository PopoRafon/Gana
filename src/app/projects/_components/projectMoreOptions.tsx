'use client';

import type { Setting } from '@/components/modal/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './projects.module.css';
import Image from 'next/image';
import SettingsModal from '@/components/modal/settingsModal';

type ProjectMoreOptions = {
    projectId: string;
}

export default function ProjectMoreOptions({ projectId }: ProjectMoreOptions) {
    const router = useRouter();
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const settings: Setting[] = [{ text: 'Delete', handleClick: handleDelete }];

    function handleDelete() {
        router.push(`/projects?modal=delete&project-id=${projectId}`);
        setShowSettings(false);
    }

    return (
        <div className={styles['more-options-container']}>
            <button
                className={styles['more-options-button']}
                onClick={() => setShowSettings(true)}
            >
                <Image
                    src="/images/icons/more.svg"
                    width={20}
                    height={20}
                    alt="More options image"
                />
            </button>
            {showSettings && (
                <SettingsModal
                    settings={settings}
                    setShowSettings={setShowSettings}
                />
            )}
        </div>
    );
}
