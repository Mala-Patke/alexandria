//@ts-nocheck file
import { createPool } from "@vercel/postgres";

export default defineEventHandler(async e => {
    //First things first, check auth
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

    //Then I want to get a list of this user's friends (wow that was easy)
    let { friendshipData } = await $fetch(`/api/user/${userData[0].id}/friends?token=${query.token}`);

    //Then I want to one by one get a list of everything these users have reviewed in the past 3 days
    let { rows: elements } = await client.query(`
        SELECT * FROM REVIEWS WHERE
        time > CURRENT_DATE - INTERVAL '3 Days' AND
        user_id IN ('${userData[0].id}'${friendshipData.length ? ', ' + friendshipData.map(e => `'${e.id}'`).join(", ") : ''});
    `);

    //Return all of the review objects
    return {
        statusCode: 200, elements: elements.reverse()
    };
});