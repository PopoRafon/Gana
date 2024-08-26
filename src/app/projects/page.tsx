import styles from './projects.module.css';
import ProjectsList from './_components/projectsList';
import CreateProjectButton from './_components/createProjectButton';

export default function Projects() {
    return (
        <main className="page-dark-bg">
            <section className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles['header-text']}>Your Projects</h2>
                    <CreateProjectButton />
                </div>
                <div className={styles.body}>
                    <ProjectsList />
                </div>
            </section>
        </main>
    );
}
