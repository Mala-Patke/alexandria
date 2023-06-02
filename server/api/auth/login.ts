//@ts-nocheck file
import { createPool } from '@vercel/postgres';
import hashPassword from '../../../assets/hashPassword';
import generateAccessToken from '../../../assets/generateAccessToken';

//TODO: add email and password verification

export default defineEventHandler(async event => {
    const client = createPool();
    const config = useRuntimeConfig();
    let query = getQuery(event);

    if(!query.email || !query.password) return {
        statusCode: 400, message: 'Yo how you tryna log in without an email and password.'
    }

    let dbRes : QueryResult = await client.query(`SELECT id,password,access_token FROM users WHERE email = '${query.email.replaceAll("'", "''")}';`);
    let userInfo = dbRes.rows[0];
    

    if(!userInfo) return {
        statusCode: 401, message: "I can't find that email in the database. Maybe you need to sign up."
    }
    
    if(hashPassword(query.password, config.SALT) !== userInfo.password) return {
        statusCode: 401, message: 'Password is incorrect'
    }

    if(!userInfo.access_token) userInfo.access_token = generateAccessToken();

    let tokenexpirydate : Date = new Date(Date.now());
    tokenexpirydate.setDate(tokenexpirydate.getDate() + 3);

    await client.query(`UPDATE users SET access_token = '${userInfo.access_token}', token_expires_at = to_timestamp(${tokenexpirydate.getTime()} / 1000.00) WHERE id = '${userInfo.id}';`);

    return { statusCode: 200, userId: userInfo.id, access_token: userInfo.access_token, token_expires_at: tokenexpirydate };
});