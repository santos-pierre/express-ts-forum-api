import db from './../../src/models/';
import CategorySeeder from './CategorySeeder';
import UserSeeder from './UserSeeder';

const main = async () => {
    await UserSeeder();
    await CategorySeeder();
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
