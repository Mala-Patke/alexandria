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

    //Check if requested user exists
    let { rows: requestedUser } = await client.query(`SELECT id FROM users WHERE id = '${query.targetid}'`)
    if(!requestedUser.length) return {
        statusCode: 400, message: "Friended user does not exist."
    }

    await client.query(`
        INSERT INTO friendships VALUES ('${userData[0].id}', '${query.targetid}', 'R', to_timestamp(${Date.now()} / 1000.00));
    `);

    return {
        statusCode: 200,
        message: 'Request sent to user!'
    }
});