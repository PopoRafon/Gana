import styles from './projects.module.css';
import ProjectsList from './_components/projectsList';
import Link from 'next/link';

export default function Projects() {
    return (
        <main className="page-dark-bg">
            <section className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles['header-text']}>Your Projects</h2>
                    <Link
                        href="/projects?show=true"
                        className={styles['create-project-button']}
                    >
                        Create
                    </Link>
                </div>
                <div className={styles.body}>
                    <ProjectsList />
                </div>
            </section>
        </main>
    );
}
