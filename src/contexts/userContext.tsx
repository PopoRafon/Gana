import { useContext, createContext, useState } from 'react';

export type User = {
    isAuthenticated: boolean;
    email: string;
    username: string;
    accountType: '' | 'company' | 'personal';
}

type UserContext = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const userContext = createContext<UserContext | null>(null);

type UserContextProviderProps = {
    children: JSX.Element;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User>({ isAuthenticated: false, email: '', username: '', accountType: '' });

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}

export function useUserContext(): UserContext {
    const context = useContext(userContext);

    if (context === null) {
        throw new Error('User context should be used within UserContextProvider.');
    }

    return context;
}
