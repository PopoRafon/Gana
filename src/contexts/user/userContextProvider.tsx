'use client';

import type { ClientUser } from './types';
import { useState } from 'react';
import { userContext } from './userContext';

type UserContextProviderProps = {
    initialUser: ClientUser;
    children: JSX.Element;
}

export default function UserContextProvider({ initialUser, children }: UserContextProviderProps) {
    const [user, setUser] = useState<ClientUser>({ ...initialUser });

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}
