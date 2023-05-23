import crypto from 'crypto';

export default function() {
    return crypto.randomBytes(8).toString('hex');
}