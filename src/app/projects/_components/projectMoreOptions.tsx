'use client';

import type { Setting } from '@/components/modal/types';
import { useState } from 'react';
import styles from './projects.module.css';
import Image from 'next/image';
import SettingsModal from '@/components/modal/settingsModal';

export default function ProjectMoreOptions() {
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const settings: Setting[] = [{ text: 'Delete', handleClick: handleDelete }];

    function handleDelete() {

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
