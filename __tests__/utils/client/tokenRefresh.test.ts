import { describe, test, beforeAll, afterEach, afterAll, expect } from 'vitest';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import Cookies from 'js-cookie';

describe('getCSRFToken client util', () => {
    const csrfToken: string = 'testCSRFToken';

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('sends GET request and sets csrftoken cookie with value from received token', async () => {
        server.use(
            http.get('/api/auth/token/csrf', () => {
                return HttpResponse.json({
                    data: 'Your CSRF token has been successfully issued.',
                    status: 'success'
                }, {
                    status: 200,
                    headers: {
                        'Set-Cookie': `csrftoken=${csrfToken}` // eslint-disable-line @typescript-eslint/naming-convention
                    }
                });
            })
        );

        const response = await getCSRFToken();

        expect(Cookies.get('csrftoken')).toBe(csrfToken);
        expect(response).toBe(csrfToken);
    });

    test('returns csrftoken from cookies', async () => {
        Cookies.set('csrftoken', csrfToken);

        const response = await getCSRFToken();

        expect(response).toBe(csrfToken);
    });
});
