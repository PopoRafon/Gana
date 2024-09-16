import type { ProjectModalProps } from './page';
import Page from './page';

export default async function Default(props: ProjectModalProps) {
    return (
        <Page {...props} />
    );
}