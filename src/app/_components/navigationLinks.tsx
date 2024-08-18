'use client';

import Link from 'next/link';
import styles from './navigation.module.css';
import { useUserContext } from '@/contexts/user/userContext';

type NavigationLink = {
    name: string;
    href: string;
}

const navigationLinks: NavigationLink[] = [
    { name: 'Register', href: '/register' },
    { name: 'Login', href: '/login' }
];

export default function NavigationLinks() {
    const { user } = useUserContext();

    return (
        <div className={styles['links-container']}>
            {user.isAuthenticated ? (
                <div>{user.username}</div>
            ) : (
                navigationLinks.map(link => (
                    <Link
                        href={link.href}
                        className={styles.link}
                        key={link.name}
                    >
                        {link.name}
                    </Link>
                ))
            )}
        </div>
    );
}
