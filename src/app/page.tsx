import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <main className={styles.page}>
            <section className={styles.container}>
                <h1 className={styles.header}>Welcome to Gana!</h1>
                <div className={styles['website-description']}>
                    <p>Easy to use yet powerful project management tool.</p>
                    <p>We aim to solve any issues you might encounter when dealing with project management.</p>
                </div>
                <Link
                    href="/projects"
                    className={styles['get-started-button']}
                >
                    Get Started
                </Link>
            </section>
            <div className={`${styles.waves} ${styles['waves-top']}`}>
                <Image
                    src="/images/homepage-waves.svg"
                    fill={true}
                    priority={true}
                    alt="Top waves image"
                />
            </div>
            <div className={`${styles.waves} ${styles['waves-bottom']}`}>
                <Image
                    src="/images/homepage-waves.svg"
                    fill={true}
                    priority={true}
                    alt="Bottom waves image"
                />
            </div>
        </main>
    );
}
