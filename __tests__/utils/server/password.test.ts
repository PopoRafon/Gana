import { describe, test, expect } from 'vitest';
import Password from '@/utils/server/password';

describe('password server util', () => {
    const password: string = 'testpassword';

    test('hash method correctly hashes provided password and returns its hash', async () => {
        const hash = await Password.hash(password);

        expect(hash).not.toBeNull();
        expect(typeof hash).toBe('string');
    });

    test('verify method correctly verifies provided password and its hash', async () => {
        const hash = await Password.hash(password);

        expect(await Password.verify(hash, password)).toBeTruthy();
    });
});
