import { scrypt, randomBytes, timingSafeEqual } from 'crypto';

export default class Password {
    private static keylen: number = 64;
    
    static async hash(password: string): Promise<string> {
        return await new Promise((resolve, reject) => {
            const salt: string = randomBytes(16).toString('hex');
    
            scrypt(password, salt, this.keylen, (error, derivedKey) => {
                if (error) {
                    reject(error);
                }
    
                resolve(salt + ':' + derivedKey.toString('hex'));
            });
        });
    }

    static async verify(hash: string, password: string): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            const [salt, key]: string[] = hash.split(':');

            scrypt(password, salt, this.keylen, (error, derivedKey) => {
                if (error) {
                    reject(error);
                }

                resolve(timingSafeEqual(derivedKey, Buffer.from(key, 'hex')));
            });
        });
    }
}
