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

