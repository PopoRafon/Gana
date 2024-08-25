import type { ClientUser } from '@/contexts/user/types';
import { render } from '@testing-library/react';
import { test, describe, expect } from 'vitest';
import { useUserContext } from '@/contexts/user/userContext';
import UserContextProvider from '@/contexts/user/userContextProvider';

function TestingComponent() {
    const { user } = useUserContext();

    if (!user.isAuthenticated) {
        return null;
    }

    return (
        <div>
            <div>{user.username}</div>
            <div>{user.accountType}</div>
        </div>
    );
}

describe('userContextProvider component', () => {
    const user: ClientUser = {
        isAuthenticated: true,
        username: 'testuser',
        accountType: 'personal',
        avatar: ''
    };

    test('correctly sets user value based on initialUser prop and provides it to child elements', () => {
        const { getByText } = render(
            <UserContextProvider initialUser={user}>
                <TestingComponent />
            </UserContextProvider>
        );

        expect(getByText(user.username)).toBeInTheDocument();
        expect(getByText(user.accountType)).toBeInTheDocument();
    });
});
