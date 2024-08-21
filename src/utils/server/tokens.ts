import type { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from '@/settings';
import jwt from 'jsonwebtoken';

type TokenPayload = JwtPayload & {
    userId: number;
    type: string;
}

class Token {
    private tokenType: string;
    private tokenLifetime: number;

    constructor(type: string, lifetime: number) {
        this.tokenType = type;
        this.tokenLifetime = lifetime;
    }

    create(userId: number): string {
        const payload: TokenPayload = {
            userId,
            type: this.tokenType
        };

        return jwt.sign(payload, SECRET_KEY, { expiresIn: this.tokenLifetime });
    }

    verify(token: string): boolean {
        try {
            const verifiedToken = jwt.verify(token, SECRET_KEY) as TokenPayload;

            return verifiedToken.type === this.tokenType;
        } catch {
            return false;
        }
    }

    getPayload(token: string): TokenPayload {
        return jwt.decode(token) as TokenPayload;
    }
}

export const AccessToken: Token = new Token('access', ACCESS_TOKEN_LIFETIME);
export const RefreshToken: Token = new Token('refresh', REFRESH_TOKEN_LIFETIME);
