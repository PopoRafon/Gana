import styles from './modal.module.css';
import CreateProjectForm from './_components/createProjectForm';
import Link from 'next/link';
import Image from 'next/image';

export type CreateProjectModalProps = {
    searchParams: Record<string, string> | undefined;
}

export default function CreateProjectModal({ searchParams }: CreateProjectModalProps) {
    const show: string | undefined = searchParams?.show;

    if (show !== 'true') {
        return null;
    }

    return (
        <section className={styles.backdrop}>
            <div className={`auth-form-container ${styles.modal}`}>
                <h2 className="auth-form-header">Create Project</h2>
                <Link
                    href="/projects"
                    className={styles['close-modal-button']}
                >
                    <Image
                        src="/images/icons/close.svg"
                        width={20}
                        height={20}
                        alt="Close modal image"
                    />
                </Link>
                <CreateProjectForm />
            </div>
        </section>
    );
}
