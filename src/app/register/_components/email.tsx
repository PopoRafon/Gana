import type { ChangeEvent } from 'react';
import Link from 'next/link';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';
import styles from './form.module.css';

type EmailProps = {
    email: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void
}

export default function Email({ email, handleChange }: EmailProps) {
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
            />
        </>
    );
}
