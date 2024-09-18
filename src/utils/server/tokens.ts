import type { JWTPayload } from 'jose';
import { SignJWT, jwtVerify } from 'jose';
import { SECRET_KEY, REFRESH_TOKEN_LIFETIME, ACCESS_TOKEN_LIFETIME } from '@/settings';

type TokenPayload = JWTPayload & {
    userId: number;
    type: string;
}

class Token {
    private tokenType: string;
    private tokenLifetime: number;

    constructor(type: string, lifetime: number) {
        this.tokenType = type;
        this.tokenLifetime = lifetime * 1000;
    }

    async create(userId: number): Promise<string> {
        const payload: TokenPayload = {
            userId,
            type: this.tokenType
        };

        return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setExpirationTime(Date.now() + this.tokenLifetime)
            .sign(new TextEncoder().encode(SECRET_KEY));
    }

    async verify(token: string): Promise<TokenPayload | null> {
        try {
            const verifiedToken = await jwtVerify<TokenPayload>(token, new TextEncoder().encode(SECRET_KEY));

            if (verifiedToken.payload.type !== this.tokenType) {
                return null;
            }

            return verifiedToken.payload;
        } catch {
            return null;
        }
    }
}

export const AccessToken: Token = new Token('access', ACCESS_TOKEN_LIFETIME);
export const RefreshToken: Token = new Token('refresh', REFRESH_TOKEN_LIFETIME);
