import pg from 'pg';
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

client.query(`
    INSERT INTO reviews VALUES ('test_review', 'test_media', 'c39b7239-b2b7-4eeb-bc0e-e7461db0a0c8', 'W', 'banger movie', FALSE);
`);