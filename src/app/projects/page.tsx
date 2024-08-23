import styles from './projects.module.css';

export default function Projects() {
    return (
        <main className="page-dark-bg">
            <section className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles['header-text']}>Your Projects</h2>
                </div>
            </section>
        </main>
    );
}
