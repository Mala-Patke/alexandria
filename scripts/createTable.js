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

client.query(`CREATE TABLE USERS (
    id uuid PRIMARY KEY,
    email text NOT NULL,
    name VARCHAR(20),
    account_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    password VARCHAR(64) NOT NULL,
    access_token VARCHAR(16),
    token_expires_at timestamp
);`).then(e => process.exit());

//client.query('SELECT * FROM information_schema.tables;').then(console.log);