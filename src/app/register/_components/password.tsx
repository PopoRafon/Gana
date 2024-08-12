import type { ChangeEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from './types';
import { useState, useEffect, useMemo } from 'react';
import PasswordInput from '@/components/form/passwordInput';
import Submit from '@/components/form/submit';

type PasswordProps = {
    formData: RegisterFormData;
    formErrors: RegisterFormErrors;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function Password({ formData, handleChange }: PasswordProps) {
    const password1Requirements = useMemo<string[]>(() => ['Password must be between 8 and 32 characters.'], []);
    const password2Requirements = useMemo<string[]>(() => ['Password confirmation must be the same as password.'], []);
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isPasswordValid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.password1, formData.password2]);

    function isPasswordValid(): boolean {
        if (formData.password1.length < 8 || formData.password1.length > 32) {
            return false;
        }

        if (formData.password1 !== formData.password2) {
            return false;
        }

        return true;
    }

    return (
        <>
            <PasswordInput
                label="Password"
                name="password1"
                value={formData.password1}
                requirements={password1Requirements}
                handleChange={handleChange}
            />
            <PasswordInput
                label="Confirm Password"
                name="password2"
                value={formData.password2}
                requirements={password2Requirements}
                handleChange={handleChange}
            />
            <Submit
                value="Confirm"
                disabled={error}
            />
        </>
    );
}
