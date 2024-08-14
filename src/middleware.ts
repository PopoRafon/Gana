import { cookies } from 'next/headers';

export function middleware(request: Request) {
    const safeMethods: string[] = ['GET', 'HEAD', 'OPTIONS'];

    if (!safeMethods.includes(request.method)) {
        const cookieStore = cookies();
        const headers = request.headers;
        const csrfToken1 = cookieStore.get('csrftoken');
        const csrfToken2 = headers.get('X-CSRFToken');

        if (!csrfToken1 || !csrfToken2 || csrfToken1.value !== csrfToken2) {
            return Response.json({
                data: 'CSRF token has not been set.',
                status: 'error'
            }, { status: 403 });
        }
    }
}

export const config = {
    matcher: ['/:path*']
};
