import { fireEvent, render } from '@testing-library/react';
import { expect, describe, test, vi } from 'vitest';
import PasswordInput from '@/components/form/passwordInput';

describe('passwordInput component', () => {
    const label: string = 'Password';
    const name: string = 'password';
    const value: string = '';
    const requirements: string[] = [
        'Must be between 8 and 32 characters',
        'Must contain atleast one upper character.'
    ];

    test('correctly renders input', () => {
        const { getByLabelText, getByText, queryByText, getByRole } = render(
            <PasswordInput
                label={label}
                name={name}
                value={value}
                handleChange={() => {}}
                requirements={requirements}
            />
        );

        expect(getByText(label)).toBeInTheDocument();
        expect(getByLabelText(label)).toBeInTheDocument();
        expect((getByLabelText(label) as HTMLInputElement).name).toBe(name);
        expect(getByRole('button')).toBeInTheDocument();
        expect(queryByText(requirements[0])).not.toBeInTheDocument();
        expect(queryByText(requirements[1])).not.toBeInTheDocument();
    });

    test('displays provided requirements when input is focused and hides it when input is blurred', () => {
        const { queryByText, getByLabelText, getByText } = render(
            <PasswordInput
                label={label}
                name={name}
                value={value}
                handleChange={() => {}}
                requirements={requirements}
            />
        );

        fireEvent.focus(getByLabelText(label));

        expect(getByText(requirements[0])).toBeInTheDocument();
        expect(getByText(requirements[1])).toBeInTheDocument();

        fireEvent.blur(getByLabelText(label));

        expect(queryByText(requirements[0])).not.toBeInTheDocument();
        expect(queryByText(requirements[1])).not.toBeInTheDocument();
    });

    test('calls handleChange function when input value changes', () => {
        const handleChangeMock = vi.fn();
        const newValue: string = 'testpassword';
        const { getByLabelText } = render(
            <PasswordInput
                label={label}
                name={name}
                value={value}
                handleChange={handleChangeMock}
                requirements={requirements}
            />
        );

        fireEvent.change(getByLabelText(label), { target: { value: newValue } });

        expect(handleChangeMock).toHaveBeenCalledOnce();
    });

    test('shows password when "show password" button gets clicked', () => {
        const { getByLabelText, getByRole } = render(
            <PasswordInput
                label={label}
                name={name}
                value={value}
                handleChange={() => {}}
            />
        );

        fireEvent.click(getByRole('button'));

        expect((getByLabelText(label) as HTMLInputElement).type).toBe('text');

        fireEvent.click(getByRole('button'));

        expect((getByLabelText(label) as HTMLInputElement).type).toBe('password');
    });
});
