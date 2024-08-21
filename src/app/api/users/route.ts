import { authenticate } from '@/lib/auth';

export async function GET() {
    const user = await authenticate();

    if (!user) {
        return Response.json({
            data: 'You need to be authenticated to get user data.',
            status: 'error'
        }, { status: 403 });
    }

    const data = {
        username: user.username,
        accountType: user.accountType
    };

    return Response.json({
        data,
        status: 'success'
    }, { status: 200 });
}
