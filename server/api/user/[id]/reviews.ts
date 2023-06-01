import { createPool } from '@vercel/postgres';

export default defineEventHandler(async e => {
    const client = createPool();
    const query = getQuery(e);

    //Authorize Request
    let { rows: userData } = await client.query(`SELECT id,access_token,token_expires_at FROM users WHERE id = '${e.context.params?.id}' AND access_token = '${query.token}'`);
    if(!userData.length) return {
        statusCode: 400, message: "User does not exist or access_token is expired. If you think this is a mistake, log in again."
    };

    let tokenexpiry = userData[0].token_expires_at;
    if(Date.now() > tokenexpiry.getTime()) return {
        statusCode: 403, message: "Token has expired. Please log in again."
    }

    let { rows: reviewData } = await client.query(`SELECT * FROM reviews WHERE user_id='${e.context.params?.id}'`);

    return {
        id: e.context.params?.id,
        statusCode: 200,
        reviews: reviewData
    };
});