import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';

export default function Navigation() {
    return (
        <nav className={styles.navigation}>
            <Link
                href="/"
                className={styles.logo}
            >
                <Image
                    src="/images/logo.png"
                    width={60}
                    height={25}
                    alt="Logo image"
                    quality={100}
                    priority
                />
            </Link>
            <div className={styles['links-container']}>
                <Link
                    href="/register"
                    className={styles.link}
                >
                    Register
                </Link>
                <Link
                    href="/login"
                    className={styles.link}
                >
                    Login
                </Link>
            </div>
        </nav>
    );
}
