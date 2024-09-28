import type { ChangeEvent } from 'react';
import styles from './form.module.css';

type Option = {
    text: string;
    value: string;
}

type SelectInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange(event: ChangeEvent<HTMLSelectElement>): void;
    options: Option[];
}

export default function SelectInput({ label, name, value, handleChange, options }: SelectInputProps) {
    return (
        <label className={styles.label}>
            <div className={styles['label-name']}>
                {label}
            </div>
            <select
                className={styles.input}
                name={name}
                value={value}
                onChange={handleChange}
            >
                {options.map(option => (
                    <option
                        value={option.value}
                        key={option.value}
                    >
                        {option.text}
                    </option>
                ))}
            </select>
        </label>
    );
}
