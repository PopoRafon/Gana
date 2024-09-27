import CreateProjectForm from './_components/createProjectForm';
import DeleteProjectForm from './_components/deleteProjectForm';
import UpdateProjectForm from './_components/updateProjectForm';
import CloseModalButton from '@/components/modal/closeModalButton';

export type ProjectModalProps = {
    searchParams: Record<string, string> | undefined;
}

type ModalForm = {
    header: string;
    form: JSX.Element;
}

const modalForms: Record<string, ModalForm> = {
    create: { header: 'Create Project', form: <CreateProjectForm /> },
    delete: { header: 'Delete Project', form: <DeleteProjectForm /> },
    update: { header: 'Update Project', form: <UpdateProjectForm /> }
};

export default function ProjectModal({ searchParams }: ProjectModalProps) {
    const modal: string | undefined = searchParams?.modal;

    if (!modal || !Object.keys(modalForms).includes(modal)) {
        return null;
    }

    return (
        <section className="modal-backdrop">
            <div className="auth-form-container modal">
                <h2 className="auth-form-header">{modalForms[modal].header}</h2>
                <CloseModalButton
                    returnURL="/projects"
                />
                {modalForms[modal].form}
            </div>
        </section>
    );
}
