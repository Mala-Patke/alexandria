import crypto from 'crypto';

export default function(password: String, salt: String) {
    return crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(salt), 1000, 32, 'sha512').toString('hex');
}