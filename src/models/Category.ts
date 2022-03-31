import { Category } from '@prisma/client';
import db from '.';

type CategoryData = {
    name: string;
};

type PaginationOptions = {
    limit: number;
    offset: number;
};

const getAll = async ({
    limit,
    offset,
}: PaginationOptions): Promise<{ count: number; categories: Category[] }> => {
    const [count, categories] = await db.$transaction([
        db.category.count(),
        db.category.findMany({
            skip: offset,
            take: limit,
        }),
    ]);

    return { count, categories };
};

const getById = async (id: number) => {
    const category = await db.category.findUnique({ where: { id } });

    return category;
};

const create = async (data: CategoryData) => {
    try {
        const newCategory = await db.category.create({ data });
        return newCategory;
    } catch (error) {}
};

const update = () => {};

const destroy = () => {};

const Category = { getAll, getById, create, update, destroy };

export default Category;
