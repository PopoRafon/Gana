import type { ChangeEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from './types';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';
import styles from './form.module.css';

type EmailProps = {
    formData: RegisterFormData;
    formErrors: RegisterFormErrors;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function Email({ formData, handleChange }: EmailProps) {
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isEmailValid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.email]);

    function isEmailValid(): boolean {
        if (!formData.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
            return false;
        }

        return true;
    }

    return (
        <>
            <TextInput
                label="Email Address"
                name="email"
                value={formData.email}
                handleChange={handleChange}
                type="email"
            />
            <p className={styles.agreement}>
                By clicking button &quot;Sign up&quot; you agree to <Link href="/terms-of-service">Terms Of Service</Link>.
            </p>
            <Submit
                value="Sign up"
                disabled={error}
            />
        </>
    );
}
