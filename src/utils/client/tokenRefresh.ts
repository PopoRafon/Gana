import { ACCESS_TOKEN_LIFETIME } from '@/settings';
import Cookies from 'js-cookie';

export class AccessToken {
    private static tokenRefreshInterval: null | NodeJS.Timeout = null;
    private static tokenRefreshTime: number = (ACCESS_TOKEN_LIFETIME * 1e3) - 12e4;

    static removePeriodicRefresh(): void {
        if (!this.tokenRefreshInterval) {
            return;
        }

        clearInterval(this.tokenRefreshInterval);
        this.tokenRefreshInterval = null;
    }

    static setPeriodicRefresh(): void {
        if (this.tokenRefreshInterval) {
            return;
        }

        this.tokenRefreshInterval = setInterval(this.refresh, this.tokenRefreshTime);
    }

    static async refresh(): Promise<void> {
        const csrfToken: string = await getCSRFToken();

        await fetch('/api/auth/token/access', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        });
    }
}

export async function getCSRFToken(): Promise<string> {
    let csrfToken: string | undefined = Cookies.get('csrftoken');

    if (!csrfToken) {
        await fetch('/api/auth/token/csrf');

        csrfToken = Cookies.get('csrftoken') as string;
    }

    return csrfToken;
}
