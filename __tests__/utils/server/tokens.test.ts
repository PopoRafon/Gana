import { describe, expect, test } from 'vitest';
import { RefreshToken, AccessToken } from '@/utils/server/tokens';

describe('token server util', () => {
    const userId: number = Math.round(Math.random() * 100);

    test('create method correctly creates token with provided userID argument inside its payload', async () => {
        const token = await RefreshToken.create(userId);

        expect(token).not.toBeNull();
        expect(typeof token).toBe('string');
    });

    test('verify method correctly verifies provided token and returns its payload', async () => {
        const token = await RefreshToken.create(userId);
        const verifiedToken = await RefreshToken.verify(token);

        expect(verifiedToken).not.toBeNull();
        expect(verifiedToken?.userId).toBe(userId);
        expect(verifiedToken?.type).toBe('refresh');
        expect(await RefreshToken.verify('incorrecttoken')).toBeNull();
        expect(await AccessToken.verify(token)).toBeNull();
    });
});
