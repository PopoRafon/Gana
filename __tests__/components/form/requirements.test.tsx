import { render } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import Requirements from '@/components/form/requirements';

describe('requirements component', () => {
    test('correctly renders provided requirements', () => {
        const requirements: string[] = [
            'Must be between 8 and 16 characters.',
            'Must contain only alphabet characters and numbers.'
        ];

        const { getByText } = render(
            <Requirements
                requirements={requirements}
            />
        );

        expect(getByText(requirements[0])).toBeInTheDocument();
        expect(getByText(requirements[1])).toBeInTheDocument();
    });
});
