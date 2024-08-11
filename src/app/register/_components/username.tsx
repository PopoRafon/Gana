import type { ChangeEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from './types';
import { useState, useEffect } from 'react';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';
import RadioInput from '@/components/form/radioInput';
import styles from './form.module.css';

type UsernameProps = {
    formData: RegisterFormData;
    formErrors: RegisterFormErrors;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function Username({ formData, handleChange }: UsernameProps) {
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isUsernameValid() || !isAccountTypeValid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.username, formData.accountType]);

    function isUsernameValid(): boolean {
        if (formData.username.length < 8 || formData.username.length > 16) {
            return false;
        }

        if (!formData.username.match(/^\w+$/)) {
            return false;
        }

        return true;
    }

    function isAccountTypeValid(): boolean {
        return formData.accountType === 'personal' || formData.accountType === 'company';
    }

    return (
        <>
            <TextInput
                label="Username"
                name="username"
                value={formData.username}
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
