import { cookies } from 'next/headers';

export function POST() {
    const cookieStore = cookies();

    cookieStore.delete('access');
    cookieStore.delete('refresh');

    return Response.json({
        data: 'You have been successfully logged off.',
        status: 'success'
    }, { status: 200 });
}
