import type { ChangeEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from './types';
import Link from 'next/link';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';
import styles from './form.module.css';

type EmailProps = {
    formData: RegisterFormData;
    formErrors: RegisterFormErrors;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const emailRequirements: string[] = [
    'Email address must be valid.',
    'Email address must be unique.'
];

export default function Email({ formData, handleChange }: EmailProps) {
    const error: boolean = !isEmailValid();

    function isEmailValid(): boolean {
        return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
    }

    return (
        <>
            <TextInput
                label="Email Address"
                name="email"
                value={formData.email}
                requirements={emailRequirements}
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
