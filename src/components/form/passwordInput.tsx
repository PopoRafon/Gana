'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import styles from './form.module.css';
import Image from 'next/image';
import Requirements from './requirements';

type PasswordInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
    requirements?: string[];
}

export default function PasswordInput({ label, name, value, handleChange, requirements=[] }: PasswordInputProps) {
    const [showRequirements, setShowRequirements] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div>
            <label className={styles.label}>
                <div className={styles['label-name']}>
                    {label}
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        className={`${styles.input} ${styles.password}`}
                        type={showPassword ? 'text' : 'password'}
                        name={name}
                        value={value}
                        onFocus={() => setShowRequirements(true)}
                        onBlur={() => setShowRequirements(false)}
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
            <Requirements
                requirements={requirements}
                showRequirements={showRequirements}
            />
        </div>
    );
}
