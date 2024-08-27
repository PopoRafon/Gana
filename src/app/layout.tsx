import type { Metadata } from 'next';
import type { ClientUser } from '@/contexts/user/types';
import { Roboto } from 'next/font/google';
import { cookies } from 'next/headers';
import { RefreshToken } from '@/utils/server/tokens';
import prisma from '@/lib/db';
import TokenRefresher from './_components/tokenRefresher';
import UserContextProvider from '@/contexts/user/userContextProvider';
import Navigation from './_components/navigation';
import './globals.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Gana',
    description: 'Efficient project management tool',
};

async function getUserData(): Promise<ClientUser> {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refresh');

    if (!refreshToken || !RefreshToken.verify(refreshToken.value)) {
        return { isAuthenticated: false };
    }

    const { userId } = RefreshToken.getPayload(refreshToken.value);
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
        return { isAuthenticated: false };
    }

    const userData: ClientUser = {
        isAuthenticated: true,
        username: user.username,
        accountType: user.accountType,
        avatar: user.avatar
    };

    return userData;
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <UserContextProvider initialUser={await getUserData()}>
                <body className={roboto.className}>
                    <TokenRefresher />
                    <header><Navigation /></header>
                    {children}
                </body>
            </UserContextProvider>
        </html>
    );
}
