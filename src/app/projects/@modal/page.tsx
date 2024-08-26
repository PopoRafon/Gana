import styles from './modal.module.css';
import CreateProjectForm from './_components/createProjectForm';

type CreateProjectModal = {
    searchParams: Record<string, string> | undefined;
}

export default function CreateProjectModal({ searchParams }: CreateProjectModal) {
    const show: string | undefined = searchParams?.show;

    if (show !== 'true') {
        return null;
    }

    return (
        <section className={styles.modal}>
            <div className="auth-form-container">
                <h2 className="auth-form-header">Create Project</h2>
                <CreateProjectForm />
            </div>
        </section>
    );
}
