import db from './../../src/models/';

const CategorySeeder = async () => {
    const categoriesSample = [
        {
            name: 'php',
        },
        {
            name: 'javascript',
        },
        {
            name: 'postgres',
        },
        {
            name: 'expressJS',
        },
        {
            name: 'react',
        },
    ];
    try {
        await db.category.createMany({ data: categoriesSample });
    } catch (error) {
        throw error;
    }
};

export default CategorySeeder;
