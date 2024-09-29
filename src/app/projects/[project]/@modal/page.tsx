import CloseModalButton from '@/components/modal/closeModalButton';
import AddUserForm from './_components/addUserForm';

export type UsersModalProps = {
    searchParams: Record<string, string> | undefined;
    params: Record<string, string> | undefined;
}

export default function UsersModal({ searchParams, params }: UsersModalProps) {
    const modal = searchParams?.modal;

    if (modal !== 'users' || !params) {
        return null;
    }

    return (
        <section className="modal-backdrop">
            <div className="auth-form-container modal">
                <h2 className="auth-form-header">Project Users</h2>
                <CloseModalButton
                    returnURL={`/projects/${params.project}`}
                />
                <AddUserForm
                    projectId={params.project}
                />
            </div>
        </section>
    );
}
