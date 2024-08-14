import { render } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import Submit from '@/components/form/submit';

describe('submit component', () => {
    const value: string = 'Register';

    test('correctly renders input', () => {
        const { getByDisplayValue } = render(
            <Submit
                value={value}
                disabled={true}
            />
        );

        expect(getByDisplayValue(value)).toBeInTheDocument();
        expect((getByDisplayValue(value) as HTMLButtonElement).disabled).toBeTruthy();
    });
});
