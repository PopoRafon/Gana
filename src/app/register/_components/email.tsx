import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';
import styles from './form.module.css';

type EmailProps = {
    email: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function Email({ email, handleChange }: EmailProps) {
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isEmailValid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    function isEmailValid(): boolean {
        if (!email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
            return false;
        }

        // TODO: Add check if user with that email address already exist

        return true;
    }

    return (
        <>
            <TextInput
                label="Email Address"
                name="email"
                value={email}
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
