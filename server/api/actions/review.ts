import { createPool } from '@vercel/postgres';
import { randomBytes } from 'crypto';

/**
 * Expected Body Parameter:
 * media_id string
 * rating [W, M, L]
 * review string
 * spoilers (optional) string boolean default false
 */
export default defineEventHandler(async event => {
    const query = getQuery(event);
    const body = await readBody(event);
    //Ensure auth
    const client = createPool();
    //@ts-ignore
    const { rows: userData } =  await client.query(`SELECT id,token_expires_at FROM users WHERE access_token = '${query.token?.replaceAll("'", "''")}'`);
    if(!userData.length) return {
        statusCode: 400, message: "User does not exist or access_token is expired. If you think this is a mistake, log in again."
    };

    //Sanitize
    let review_id = randomBytes(16).toString('hex');
    let media_id = body.media_id?.replaceAll("'", "''");
    let user_id = userData[0].id;
    let rating = ['W', 'L', 'M'].includes(body.rating) ? body.rating : null;
    let review = body.review?.replaceAll("'", "''");
    let spoilers = ['true', 'false'].includes(body.spoilers) ? body.spoilers : 'false';
    let timestamp = `to_timestamp(${Date.now()} / 1000.00)`;

    if([media_id, user_id, rating, review, spoilers].map(e => !!e).includes(false)) {
        return {
            statusCode: 400, message: 'Malformed Parameters. Not all required elements were given'
        };
    }

    //Actions
    await client.query(`
        INSERT INTO reviews VALUES (
            '${review_id}',
            '${media_id}',
            '${user_id}',
            '${rating}',
            '${review}',
            ${spoilers},
            ${timestamp}
        );
    `);

    //Error handling: It handles its own errors lmao
    return {
        statusCode: 200, message: 'Success'
    }
});