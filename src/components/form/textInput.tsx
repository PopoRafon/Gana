'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import Requirements from './requirements';
import styles from './form.module.css';

type TextInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
    requirements?: string[];
    type?: 'text' | 'email';
}

export default function TextInput({ label, name, value, handleChange, requirements=[], type='text' }: TextInputProps) {
    const [showRequirements, setShowRequirements] = useState<boolean>(false);

    return (
        <div>
            <label className={styles.label}>
                <div className={styles['label-name']}>
                    {label}
                </div>
                <input
                    className={styles.input}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setShowRequirements(true)}
                    onBlur={() => setShowRequirements(false)}
                    autoComplete="off"
                />
            </label>
            {showRequirements && (
                <Requirements
                    requirements={requirements}
                />
            )}
        </div>
    );
}
