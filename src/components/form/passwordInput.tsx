'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import styles from './form.module.css';
import Image from 'next/image';

type PasswordInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function PasswordInput({ label, name, value, handleChange }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <label className={styles.label}>
            {label}
            <div style={{ position: 'relative' }}>
                <input
                    className={`${styles.input} ${styles.password}`}
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles['show-password']}
                >
                    {showPassword ? (
                        <Image
                            src="/images/icons/hide.svg"
                            width={30}
                            height={30}
                            alt="Show password"
                        />
                    ) : (
                        <Image
                            src="/images/icons/show.svg"
                            width={30}
                            height={30}
                            alt="Show password"
                        />
                    )}
                </button>
            </div>
        </label>
    );
}
