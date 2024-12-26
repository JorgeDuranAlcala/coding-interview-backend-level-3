import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: 3000,
    host: 'localhost',
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    environment: process.env.NODE_ENV || 'development',
}