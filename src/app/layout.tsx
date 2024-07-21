import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Navigation from './_components/Navigation';
import './globals.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Gana',
    description: 'Efficient project management tool',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <header><Navigation /></header>
                {children}
            </body>
        </html>
    );
}
