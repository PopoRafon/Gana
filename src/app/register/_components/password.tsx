import type { ChangeEvent } from 'react';
import PasswordInput from '@/components/form/passwordInput';
import Submit from '@/components/form/submit';

type PasswordProps = {
    password1: string;
    password2: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void
}

export default function Password({ password1, password2, handleChange }: PasswordProps) {
    return (
        <>
            <PasswordInput
                label="Password"
                name="password1"
                value={password1}
                handleChange={handleChange}
            />
            <PasswordInput
                label="Confirm Password"
                name="password2"
                value={password2}
                handleChange={handleChange}
            />
            <Submit
                value="Confirm"
            />
        </>
    );
}
