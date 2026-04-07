import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

// Parse DATABASE_URL if provided (format: mysql://user:password@host:port/database)
function parseDatabaseUrl(url: string) {
    try {
        const dbUrl = new URL(url);
        const database = dbUrl.pathname.slice(1);// Remove leading /

        // Remove ?ssl-mode=REQUIRED from URL pathname if URL parser includes it
        const dbName = database.split('?')[0];

        //Sanitize the database name to prevent potential issues
        if (!dbName) {
            console.log(`Database name is required`)
            throw new Error('Database name is required in DATABASE_URL');
        }
        return {
            host: dbUrl.hostname,
            port: dbUrl.port ? parseInt(dbUrl.port) : 3306,
            user: dbUrl.username,
            password: dbUrl.password,
            database: dbName,
            // Fix: If not production, remove the key entirely instead of setting it to undefined
            ...(isProduction ? {
                ssl: {
                    ca: fs.readFileSync(process.env.SSL_CA_PATH || path.join(__dirname, 'ca.pem')),
                    rejectUnauthorized: true
                }
            } : {})
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Invalid DATABASE_URL format';
        console.error('DATABASE_URL error:', message);
        throw error instanceof Error ? error : new Error('Invalid DATABASE_URL format');
    }
}

// If DATABASE_URL exists, use it; otherwise, use individual env vars
const dbConfig = process.env.DATABASE_URL
    ? parseDatabaseUrl(process.env.DATABASE_URL)
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        database: process.env.DB_NAME || 'quinteriors',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        // Fix: Same here, omit ssl if not needed
        ...(isProduction ? { ssl: { rejectUnauthorized: false } } : {})
    };

export const db = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0
});
