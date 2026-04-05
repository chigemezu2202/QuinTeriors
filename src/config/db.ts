import mysql from "mysql2/promise";

// Write: Database configuration placeholder
export const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    // port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'quinteriors',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
});
