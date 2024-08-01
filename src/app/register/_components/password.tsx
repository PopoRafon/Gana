import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import PasswordInput from '@/components/form/passwordInput';
import Submit from '@/components/form/submit';

type PasswordProps = {
    password1: string;
    password2: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function Password({ password1, password2, handleChange }: PasswordProps) {
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isPasswordValid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password1, password2]);

    function isPasswordValid(): boolean {
        if (password1.length < 8 || password1.length > 32) {
            return false;
        }

        if (password1 !== password2) {
            return false;
        }

        return true;
    }

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
                disabled={error}
            />
        </>
    );
}
