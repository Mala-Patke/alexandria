import { createPool } from '@vercel/postgres';

export default defineEventHandler(async e => {
    const client = createPool();
    const query = getQuery(e);

    //Authorize Request
    let { rows: userData } = await client.query(`SELECT id,access_token,token_expires_at FROM users WHERE access_token = '${query.token}'`);
    if(!userData.length) return {
        statusCode: 400, message: "User does not exist or access_token is expired. If you think this is a mistake, log in again."
    };

    let tokenexpiry = userData[0].token_expires_at;
    if(Date.now() > tokenexpiry.getTime()) return {
        statusCode: 403, message: "Token has expired. Please log in again."
    }

    let { rows: reviews } = await client.query(`SELECT * FROM reviews WHERE media_id = '${e.context.params?.mid}'`);

    return {
        statusCode: 200,
        review: reviews
    };
});