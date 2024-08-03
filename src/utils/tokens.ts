import { SECRET_KEY, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from '@/settings';
import jwt from 'jsonwebtoken';

export async function createAccessToken(userId: number): Promise<string> {
    const payload: Record<string, string | number> = {
        userId,
        type: 'refresh'
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_LIFETIME });
}

export async function createRefreshToken(userId: number): Promise<string> {
    const payload: Record<string, string | number> = {
        userId,
        type: 'refresh'
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: REFRESH_TOKEN_LIFETIME });
}
