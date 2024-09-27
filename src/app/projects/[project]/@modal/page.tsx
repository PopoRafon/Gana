import CloseModalButton from '@/components/modal/closeModalButton';

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
                <CloseModalButton
                    returnURL={`/projects/${params.project}`}
                />
            </div>
        </section>
    );
}
