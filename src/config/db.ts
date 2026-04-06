import  dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.configDotenv()

const isProduction = process.env.NODE_ENV === 'production';

// If DATABASE_URL (Aiven URI) exists, use it; otherwise, use local parts
const dbConfig = process.env.DATABASE_URL
    ? {
        uri: process.env.DATABASE_URL,
        // Aiven requires SSL for external connections
        ssl: {
            rejectUnauthorized: true // Set to false only if you have certificate issues 
        }
    }
    : {
        host: process.env.DB_HOST || '',
        database: process.env.DB_NAME || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
    };

export const db = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0
});
