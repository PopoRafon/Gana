import type { ClientUser } from './types';
import { useContext, createContext } from 'react';

type UserContext = {
    user: ClientUser;
    setUser: React.Dispatch<React.SetStateAction<ClientUser>>;
}

export const userContext = createContext<UserContext | null>(null);

export function useUserContext(): UserContext {
    const context = useContext(userContext);

    if (context === null) {
        throw new Error('User context should be used within UserContextProvider.');
    }

    return context;
}
