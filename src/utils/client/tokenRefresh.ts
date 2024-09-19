import Cookies from 'js-cookie';

export async function getCSRFToken(): Promise<string> {
    let csrfToken: string | undefined = Cookies.get('csrftoken');

    if (!csrfToken) {
        await fetch('/api/auth/token/csrf');

        csrfToken = Cookies.get('csrftoken') as string;
    }

    return csrfToken;
}
