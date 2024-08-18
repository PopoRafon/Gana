import type { Metadata } from 'next';
import type { ClientUser } from '@/types/client/user';
import { Roboto } from 'next/font/google';
import { authenticate } from '@/lib/auth';
import Navigation from './_components/navigation';
import './globals.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Gana',
    description: 'Efficient project management tool',
};

async function getUserData(): Promise<ClientUser> {
    const user = await authenticate();

    if (!user) {
        return { isAuthenticated: false };
    }

    return { isAuthenticated: true, username: user.username, accountType: user.accountType };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await getUserData();

    return (
        <html lang="en">
            <body className={roboto.className}>
                <header><Navigation /></header>
                {children}
            </body>
        </html>
    );
}
