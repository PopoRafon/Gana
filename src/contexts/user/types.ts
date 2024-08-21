type AuthenticatedUser = {
    isAuthenticated: true;
    username: string;
    accountType: 'personal' | 'company';
    avatar: string;
}

type UnauthenticatedUser = {
    isAuthenticated: false;
}

export type ClientUser = AuthenticatedUser | UnauthenticatedUser;
