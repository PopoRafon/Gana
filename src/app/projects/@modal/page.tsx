import styles from './page.module.css';
import CreateProjectForm from './_components/createProjectForm';
import DeleteProjectForm from './_components/deleteProjectForm';
import Link from 'next/link';
import Image from 'next/image';

export type ProjectModalProps = {
    searchParams: Record<string, string> | undefined;
}

type ModalForm = {
    header: string;
    form: JSX.Element;
}

const modalForms: Record<string, ModalForm> = {
    create: { header: 'Create Project', form: <CreateProjectForm /> },
    delete: { header: 'Delete Project', form: <DeleteProjectForm /> }
};

export default function ProjectModal({ searchParams }: ProjectModalProps) {
    const modal: string | undefined = searchParams?.modal;

    if (!modal || !Object.keys(modalForms).includes(modal)) {
        return null;
    }

    return (
        <section className={styles.backdrop}>
            <div className={`auth-form-container ${styles.modal}`}>
                <h2 className="auth-form-header">{modalForms[modal].header}</h2>
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
                {modalForms[modal].form}
            </div>
        </section>
    );
}
