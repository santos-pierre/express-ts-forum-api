import db from './../../src/models/';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

async function main() {
    const password = await bcrypt.hash('password', 10); // Default Password
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
            pseudo: faker.name.findName(),
            email: faker.internet.email(),
            password,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
