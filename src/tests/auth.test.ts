import { describe, it, expect, beforeAll } from 'vitest';
import { checkPasswordHash, hashPassword, makeJWT, validateJWT } from '../auth';

describe('Password Hashing', () => {
    const password1 = 'correctPassword123!';
    const password2 = 'anotherPassword456!';
    let hash1: string;
    let hash2: string;

    beforeAll(async () => {
        hash1 = await hashPassword(password1);
        hash2 = await hashPassword(password2);
    });

    it('should return true for the correct password', async () => {
        const result = await checkPasswordHash(password1, hash1);
        expect(result).toBe(true);
    });

    it('should return false for an incorrect password', async () => {
        const result = await checkPasswordHash('wrongPassword', hash1);
        expect(result).toBe(false);
    });

    it(`should return false when password doesn't match a different hash`, async () => {
        const result = await checkPasswordHash(password1, hash2);
        expect(result).toBe(false);
    });

    it('should return false for an empty password', async () => {
        const result = await checkPasswordHash('', hash1);
        expect(result).toBe(false);
    });

    it('should return false for an invalid hash', async () => {
        const result = await checkPasswordHash(password1, 'invalidhash');
        expect(result).toBe(false);
    });
});

describe('JWT functions', () => {
    const userID = 'sir-taylor-88';
    const secret = 'strong-secret';
    const wrongSecret = 'wrong-secret';
    let validJWT: string;

    beforeAll(async () => {
        validJWT = await makeJWT(userID, 3600, secret);
    });

    it('should validate a valid token ', async () => {
        const result = validateJWT(validJWT, secret)
        expect(result).toBe(userID);
    });

    it('should throw an error for an invalid token string', () => {
        expect(() => validateJWT('invalid.token.string', secret)).toThrow(
            'Invalid token!',
        );
    });

    it('should throw an error when the token is signed with a wrong secret', () => {
        expect(() => validateJWT(validJWT, wrongSecret)).toThrow(
            'Invalid token!',
        );
    });
});
