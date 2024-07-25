import type { ChangeEvent } from 'react';
import TextInput from '@/components/form/textInput';
import Submit from '@/components/form/submit';

type UsernameProps = {
    username: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void
}

export default function Username({ username, handleChange }: UsernameProps) {
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
            />
        </>
    );
}
