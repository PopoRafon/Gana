import type { ChangeEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from './types';
import { useState, useEffect } from 'react';
import PasswordInput from '@/components/form/passwordInput';
import Submit from '@/components/form/submit';

type PasswordProps = {
    formData: RegisterFormData;
    formErrors: RegisterFormErrors;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function Password({ formData, handleChange }: PasswordProps) {
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
                handleChange={handleChange}
            />
            <PasswordInput
                label="Confirm Password"
                name="password2"
                value={formData.password2}
                handleChange={handleChange}
            />
            <Submit
                value="Confirm"
                disabled={error}
            />
        </>
    );
}
