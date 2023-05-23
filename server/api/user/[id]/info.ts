import { createPool } from '@vercel/postgres';

export default defineEventHandler(async e => {
    const client = createPool();
    const query = getQuery(e);

    let { rows: userData } = await client.query(`SELECT * FROM users WHERE id='${e.context.params?.id}' AND access_token='${query.token}'`);
    if(!userData.length) return {
        statusCode: 400, message: 'Error: ID and token not found. Please log in again'
    }

    userData[0].statusCode = 200;
    return userData[0];
});