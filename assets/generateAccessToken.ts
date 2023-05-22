import crypto from 'crypto';

export default function() {
    return crypto.randomBytes(16).toString('hex');
}