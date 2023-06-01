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


    let { rows: rawFriendshipData } = await client.query(`SELECT user1,user2 FROM friendships WHERE status = 'A' AND (user1 = '${userData[0].id}' OR user2 = '${userData[0].id}')'`);
    let friendshipData = rawFriendshipData.map(({user1, user2}) => user1 === userData[0].id ? user2 : user1);

    return {
        statusCode: 200,
        friendshipData
    };
});