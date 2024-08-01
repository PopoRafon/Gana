import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';

type UsernameProps = {
    username: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function Username({ username, handleChange }: UsernameProps) {
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        setError(!isUsernameValid());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

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

    return (
        <>
            <TextInput
                label="Username"
                name="username"
                value={username}
                handleChange={handleChange}
                type="text"
            />
            <Submit
                value="Next"
                disabled={error}
            />
        </>
    );
}
