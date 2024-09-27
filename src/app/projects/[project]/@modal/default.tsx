import type { UsersModalProps } from './page';
import Page from './page';

export default async function Default(props: UsersModalProps) {
    return (
        <Page {...props} />
    );
}
