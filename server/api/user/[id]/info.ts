import { createPool } from '@vercel/postgres';

export default defineEventHandler(async e => {
    const client = createPool();
    const query = getQuery(e);

    let { rows: userData } = await client.query(`SELECT email,name,token_expires_at FROM users WHERE id='${e.context.params?.id}'`);
    if(!userData.length) return {
        statusCode: 400, message: 'Error: ID and/or token not found. Please log in again'
    }

    userData[0].statusCode = 200;
    return userData[0];
});