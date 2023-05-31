import { createPool } from '@vercel/postgres';
import { randomBytes } from 'crypto';

export default defineEventHandler(async event => {
    const query = getQuery(event);
    const body = await readBody(event);

    //Ensure auth
    const client = createPool();
    //@ts-ignore
    const { rows: uData } =  await client.query(`SELECT id,token_expiry_date FROM users WHERE access_token = '${query.access_token?.replaceAll("'", "''")}'`);
    console.log(uData[0].token_expiry_date);

    //Check if user already has review for media
    //TODO: Check if user already has review for media

    //Sanitize
    let review_id = randomBytes(16).toString();
    let media_id = body.media_id?.replaceAll("'", "''");
    let user_id = uData[0].id;
    let rating = ['W', 'L', 'M'].includes(body.rating) ? body.rating : null;
    let review = body.review?.replaceAll("'", "''");
    let spoilers = ['true', 'false'].includes(body.spoilers) ? body.spoilers : null;

    if([media_id, user_id, rating, review, spoilers].map(e => !!e).includes(false)) return {
        statusCode: 400, message: 'Malformed Parameters. Not all required elements were given'
    };

    //Actions
    await client.query(`
        INSERT INTO reviews VALUES (
            '${review_id}',
            '${media_id}',
            '${user_id}',
            '${rating}',
            '${review}',
            ${spoilers}
        );
    `);

    //Error handling: It handles its own errors lmao
    return {
        statusCode: 200, message: 'Success'
    }
});