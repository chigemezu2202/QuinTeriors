import mysql from "mysql2/promise";

const isProduction = process.env.NODE_ENV === 'production';

// Parse DATABASE_URL if provided (format: mysql://user:password@host:port/database)
function parseDatabaseUrl(url: string) {
    try {
        const dbUrl = new URL(url);
        const database = dbUrl.pathname.slice(1);// Remove leading /
        if (!database) {
            throw new Error('Database name is required in DATABASE_URL');
        }
        return {
            host: dbUrl.hostname || 'localhost',
            port: dbUrl.port ? parseInt(dbUrl.port) : 3306,
            user: dbUrl.username || '',
            password: dbUrl.password || '',
            database,
            // Fix: If not production, remove the key entirely instead of setting it to undefined
            ...(isProduction ? { ssl: { rejectUnauthorized: true } } : {})
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
        ...(isProduction ? { ssl: { rejectUnauthorized: true } } : {})
    };

export const db = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0
});
