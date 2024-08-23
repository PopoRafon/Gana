'use client';

import { useUserContext } from '@/contexts/user/userContext';
import Link from 'next/link';
import styles from './navigation.module.css';
import AvatarButton from './avatarButton';

type NavigationLink = {
    name: string;
    href: string;
    needsAuth: boolean;
}

const navigationLinks: NavigationLink[] = [
    { name: 'Register', href: '/register', needsAuth: false },
    { name: 'Login', href: '/login', needsAuth: false },
    { name: 'Projects', href: '/projects', needsAuth: true }
];

export default function NavigationLinks() {
    const { user } = useUserContext();

    return (
        <div className={styles['links-container']}>
            {navigationLinks.map(link => link.needsAuth === user.isAuthenticated && (
                <Link
                    href={link.href}
                    className={styles.link}
                    key={link.name}
                >
                    {link.name}
                </Link>
            ))}
            {user.isAuthenticated && (
                <AvatarButton />
            )}
        </div>
    );
}
