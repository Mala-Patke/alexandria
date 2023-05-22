import pg from 'pg';
import crypto from "crypto";
import { config } from 'dotenv';
config({
    path: './.env'
});

const client = new pg.Client({
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    connectionString: process.env.POSTGRES_URL,
    ssl: true
});

client.connect();

let uuid = crypto.randomUUID();
let password = crypto.pbkdf2Sync(Buffer.from(process.env.TEST_PASSWORD), Buffer.from(process.env.SALT), 1000, 32, 'sha512').toString('hex');

let query = `
INSERT INTO users (id, email, name, password)
VALUES ('${uuid}', 'alis@khanlabschool.org', 'Mala Patke', '${password}')
`;

console.log(query);

client.query(query).then(e => {
    client.end();
});