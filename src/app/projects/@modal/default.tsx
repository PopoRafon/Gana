import type { CreateProjectModalProps } from './page';
import Page from './page';

export default async function Default(props: CreateProjectModalProps) {
    return (
        <Page {...props} />
    );
}