type AuthenticatedUser = {
    isAuthenticated: true;
    username: string;
    accountType: 'personal' | 'company';
}

type UnauthenticatedUser = {
    isAuthenticated: false;
}

export type ClientUser = AuthenticatedUser | UnauthenticatedUser;
