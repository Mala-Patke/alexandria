//@ts-nocheck file
import { createPool } from '@vercel/postgres';
import { randomUUID } from 'crypto';
import hashPassword from '../../../assets/hashPassword';
import generateAccessToken from '../../../assets/generateAccessToken';

export default defineEventHandler(async event => {
    const client = createPool();
    const config = useRuntimeConfig();
    let query = getQuery(event);

    if(!query.email || !query.password || !query.displayname) return {
        statusCode: 400, message: 'Missing info. Make sure email, display name, and password are all filled out.'
    }

    let uuid = randomUUID();
    query.email = query.email.replaceAll("'", "''");
    query.displayname = query.email.replaceAll("'", "''");
    query.password = hashPassword(query.password, process.env.SALT);
    let access_token = generateAccessToken();
    let tokenexpirydate : Date = new Date(Date.now());
    tokenexpirydate.setDate(tokenexpirydate.getDate() + 3);

    let dbres = await client.query(`
        INSERT INTO users (id, email, name, password, access_token, token_expires_at)
        VALUES ('${uuid}', '${query.email}', '${query.displayname}', '${query.password}', '${access_token}', to_timestamp(${tokenexpirydate.getTime()} / 1000.00))
    `)//.catch(console.error);

    return { statusCode: 200, userId: uuid, access_token , token_expires_at: tokenexpirydate };
});