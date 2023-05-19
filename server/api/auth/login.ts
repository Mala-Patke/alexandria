//@ts-nocheck file
import { createPool } from '@vercel/postgres';
import hashPassword from '../../../assets/hashPassword';
import generateAccessToken from '../../../assets/generateAccessToken';

export default defineEventHandler(async event => {
    const client = createPool();
    const config = useRuntimeConfig();

    let query = getQuery(event);
    if(!query.email || !query.password) return {
        code: 400, message: 'Yo how you tryna log in without an email and password.'
    }

    let dbRes : QueryResult = await client.query(`SELECT id,password,access_token,token_expires_at FROM users WHERE email = '${query.email.replaceAll("'", "''")}';`);
    let userInfo = dbRes.rows[0];

    console.log(`userInfo: ${userInfo}`);

    if(!userInfo) return {
        code: 401, message: "I can't find that email in the database. Maybe you need to sign up."
    }
    
    if(hashPassword(query.password, config.password) !== userInfo.password) return {
        code: 401, message: 'Password is incorrect'
    }

    if(!userInfo.access_token) userInfo.access_token = generateAccessToken;

    let tokenexpirydate : Date = new Date(Date.now());
    tokenexpirydate.setDate(tokenexpirydate.getDate() + 3);
    userInfo.token_expires_at = tokenexpirydate;

    await client.query(`UPDATE users SET token_expires_at = to_timestamp(${tokenexpirydate.toISOString()}) WHERE id = ${userInfo.id};`);

    return userInfo;
});