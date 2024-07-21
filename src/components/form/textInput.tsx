'use client';

import type { ChangeEvent } from 'react';
import styles from './form.module.css';

type TextInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
    type?: 'text' | 'email';
}

export default function TextInput({ label, name, value, handleChange, type='text' }: TextInputProps) {
    return (
        <label className={styles.label}>
            {label}
            <input
                className={styles.input}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
            />
        </label>
    );
}
