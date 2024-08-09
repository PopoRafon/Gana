import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';
import RadioInput from '@/components/form/radioInput';
import styles from './form.module.css';

type UsernameProps = {
    username: string;
    accountType: '' | 'personal' | 'company';
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function Username({ username, accountType, handleChange }: UsernameProps) {
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isUsernameValid() || !isAccountTypeValid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, accountType]);

    function isUsernameValid(): boolean {
        if (username.length < 8 || username.length > 16) {
            return false;
        }

        if (!username.match(/^\w+$/)) {
            return false;
        }

        // TODO: Add check if user with that username already exist

        return true;
    }

    function isAccountTypeValid(): boolean {
        return accountType === 'personal' || accountType === 'company';
    }

    return (
        <>
            <TextInput
                label="Username"
                name="username"
                value={username}
                handleChange={handleChange}
                type="text"
            />
            <div className={styles['account-types-container']}>
                <p style={{ margin: '0' }}>What account type do you want to create?</p>
                <RadioInput
                    label="Personal"
                    name="accountType"
                    value="personal"
                    handleChange={handleChange}
                />
                <RadioInput
                    label="Company"
                    name="accountType"
                    value="company"
                    handleChange={handleChange}
                />
            </div>
            <Submit
                value="Next"
                disabled={error}
            />
        </>
    );
}
