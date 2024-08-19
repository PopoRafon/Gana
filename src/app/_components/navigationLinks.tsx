'use client';

import { useEffect } from 'react';
import { useUserContext } from '@/contexts/user/userContext';
import Cookies from 'js-cookie';
import Link from 'next/link';
import styles from './navigation.module.css';
import Image from 'next/image';

type NavigationLink = {
    name: string;
    href: string;
}

const navigationLinks: NavigationLink[] = [
    { name: 'Register', href: '/register' },
    { name: 'Login', href: '/login' }
];

export default function NavigationLinks() {
    const { user, setUser } = useUserContext();

    useEffect(() => {
        fetch('/api/auth/token/csrf');
    }, []);

    async function handleLogout() {
        const csrfToken = Cookies.get('csrftoken') as string;
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        });

        if (response.ok) {
            setUser({ isAuthenticated: false });
        }
    }

    return (
        <div className={styles['links-container']}>
            {user.isAuthenticated ? (
                <>
                    <span>{user.username}</span>
                    <button
                        onClick={handleLogout}
                        className={styles.logout}
                    >
                        <Image
                            src="/images/icons/logout.svg"
                            width={24}
                            height={24}
                            alt="Logout image"
                        />
                    </button>
                </>
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
