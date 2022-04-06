import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const generateCategory = async (db: PrismaClient) => {
    const categoriesSample = new Array(5).fill(1).map(() => {
        return { name: faker.lorem.word(5) };
    });
    return await db.category.createMany({ data: categoriesSample });
};
