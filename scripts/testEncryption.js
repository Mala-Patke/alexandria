import crypto from 'crypto';

const password = 'myverysecurepassword';
const salt = 'c94313411b75ee964a4ff078adb3774e';//crypto.randomBytes(16).toString('hex');
const hash = crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(salt), 1000, 64, 'sha512');

console.log(`salt: ${salt}\nhash: ${hash.toString('hex')}`);