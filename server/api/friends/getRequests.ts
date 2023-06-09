//So for all intents and purposes, user1 is going to be the sender and user2 is going to be the receiver.
import { createPool } from '@vercel/postgres';

export default defineEventHandler(async e => {
    const client = createPool();
    const query = getQuery(e);

    let { rows: userData } = await client.query(`SELECT id,access_token,token_expires_at FROM users WHERE access_token = '${query.token}'`);
    if(!userData.length) return {
        statusCode: 400, message: "User does not exist or access_token is expired. If you think this is a mistake, log in again."
    };

    let tokenexpiry = userData[0].token_expires_at;
    if(Date.now() > tokenexpiry.getTime()) return {
        statusCode: 403, message: "Token has expired. Please log in again."
    }

    let { rows: requests } = await client.query(`
        SELECT user1 FROM friends WHERE user2 = '${query.id}' AND status = 'R';
    `);

    return {
        statusCode: 200,
        requests
    }
});