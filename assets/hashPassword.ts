import crypto from 'crypto';

export default function(password: String, salt: String) {
    return crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(salt), 1000, 64, 'sha512');
}