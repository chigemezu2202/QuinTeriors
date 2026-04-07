import bcrypt from 'bcrypt';
import { db } from './config/db.js';

const TEST_ADMIN_EMAIL = 'admin@quinteriors.com';
const TEST_ADMIN_PASSWORD = 'Admin@12345'; // Change this to your preferred password

async function seed() {
    try {
        console.log('🌱 Seeding admin account...\n');

        // Hash the password
        const password_hash = await bcrypt.hash(TEST_ADMIN_PASSWORD, 12);
        console.log('✓ Password hashed with bcrypt');

        // Check if admin already exists
        const [existing] = await db.query('SELECT id FROM admins WHERE email = ?', [TEST_ADMIN_EMAIL]);
        const existingRows = existing as Array<{ id: number }>;

        if (existingRows.length > 0) {
            console.log(`⚠ Admin with email "${TEST_ADMIN_EMAIL}" already exists. Skipping.\n`);
            process.exit(0);
        }

        // Insert admin
        await db.query(
            'INSERT INTO admins (email, password_hash, role) VALUES (?, ?, ?)',
            [TEST_ADMIN_EMAIL, password_hash, 'super_admin']
        );

        console.log('✓ Admin account created successfully\n');
        console.log('📝 Test Credentials:');
        console.log(`   Email:    ${TEST_ADMIN_EMAIL}`);
        console.log(`   Password: ${TEST_ADMIN_PASSWORD}\n`);
        console.log('🔐 Use these to login at: POST /api/v1/auth/login\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
