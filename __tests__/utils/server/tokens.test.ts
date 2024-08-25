import { describe, expect, test } from 'vitest';
import { RefreshToken, AccessToken } from '@/utils/server/tokens';

describe('token server util', () => {
    const userId: number = 12;

    test('create method correctly creates token with provided userID argument inside its payload', () => {
        const token = RefreshToken.create(userId);

        expect(token).not.toBeNull();
        expect(typeof token).toBe('string');
    });

    test('verify method correctly verifies provided token', () => {
        const token = RefreshToken.create(userId);

        expect(RefreshToken.verify(token)).toBeTruthy();
        expect(RefreshToken.verify('incorrecttoken')).toBeFalsy();
        expect(AccessToken.verify(token)).toBeFalsy();
    });

    test('getPayload method correctly returns provided tokens payload', () => {
        const token = RefreshToken.create(userId);
        const payload = RefreshToken.getPayload(token);

        expect(payload).not.toBeNull();
        expect(payload.userId).toBe(userId);
        expect(payload.type).toBe('refresh');
    });
});
