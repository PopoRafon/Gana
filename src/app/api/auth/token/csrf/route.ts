import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export function GET() {
    const cookieStore = cookies();
    const csrfToken: string = randomBytes(32).toString('hex');

    cookieStore.set({
        name: 'csrftoken',
        value: csrfToken
    });

    return Response.json({
        data: 'Your CSRF token has been successfully issued.',
        status: 'success'
    }, { status: 200 });
}
