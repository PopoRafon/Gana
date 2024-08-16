import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';

export default function Logo() {
    return (
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
    );
}
