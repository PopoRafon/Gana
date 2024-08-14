import { render, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import RadioInput from '@/components/form/radioInput';

describe('radioInput component', () => {
    const label: string = 'Account Type';
    const name: string = 'accountType';
    const value: string = '';

    test('correctly renders input with provided props', () => {
        const { getByText, getByLabelText } = render(
            <RadioInput
                label={label}
                name={name}
                value={value}
                handleChange={() => {}}
            />
        );

        expect(getByText(label)).toBeInTheDocument();
        expect(getByLabelText(label)).toBeInTheDocument();
        expect((getByLabelText(label) as HTMLInputElement).name).toBe(name);
    });

    test('calls handleChange function when input is clicked', () => {
        const handleChangeMock = vi.fn();
        const { getByLabelText } = render(
            <RadioInput
                label={label}
                name={name}
                value={value}
                handleChange={handleChangeMock}
            />
        );

        fireEvent.click(getByLabelText(label));

        expect(handleChangeMock).toHaveBeenCalledOnce();
    });
});
