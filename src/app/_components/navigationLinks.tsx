import Link from 'next/link';
import styles from './navigation.module.css';

type NavigationLink = {
    name: string;
    href: string;
}

const navigationLinks: NavigationLink[] = [
    { name: 'Register', href: '/register' },
    { name: 'Login', href: '/login' }
];

export default function NavigationLinks() {
    return (
        <div className={styles['links-container']}>
            {navigationLinks.map(link => (
                <Link
                    href={link.href}
                    className={styles.link}
                    key={link.name}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
}
