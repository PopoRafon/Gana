import type { ChangeEvent } from 'react';

type RadioInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function RadioInput({ label, name, value, handleChange }: RadioInputProps) {
    return (
        <label>
            <input
                name={name}
                type="radio"
                value={value}
                onChange={handleChange}
            />
            {label}
        </label>
    );
}
