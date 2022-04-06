import db from './../../src/models/';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const UserSeeder = async () => {
    const password = await bcrypt.hash('password', 10); // Default Password
    try {
        await db.user.create({
            data: {
                email: 'admin@admin.com',
                pseudo: 'Super Admin',
                password,
                isAdmin: true,
            },
        });

        await db.user.create({
            data: {
                email: 'user@user.com',
                pseudo: 'user',
                password,
            },
        });
    } catch (error) {
        throw error;
    }
};

export default UserSeeder;
