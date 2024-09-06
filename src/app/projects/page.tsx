import { authenticate } from '@/lib/auth';
import { redirect } from 'next/navigation';
import styles from './page.module.css';
import ProjectsTable from './_components/projectsTable';
import Link from 'next/link';

export default async function Projects() {
    if (!await authenticate()) {
        redirect('/login');
    }

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
                    <ProjectsTable />
                </div>
            </section>
        </main>
    );
}
