import { render, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import TextInput from '@/components/form/textInput';

describe('textInput component', () => {
    const label: string = 'Username';
    const name: string = 'username';
    const value: string = '';
    const requirements: string[] = [
        'Must be between 8 and 16 characters.',
        'Must contain only alphabet characters and numbers.'
    ];

    test('correctly renders input', () => {
        const { getByLabelText, getByText, queryByText } = render(
            <TextInput
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
        expect(queryByText(requirements[0])).not.toBeInTheDocument();
        expect(queryByText(requirements[1])).not.toBeInTheDocument();
    });

    test('displays provided requirements when input is focused and hides it when input is blurred', () => {
        const { queryByText, getByLabelText, getByText } = render(
            <TextInput
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
        const newValue: string = 'testusername';
        const { getByLabelText } = render(
            <TextInput
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
});
