import { Category } from '@prisma/client';
import { PaginationOption } from '@/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import db from '.';

export type CategoryData = {
    id?: number;
    name: string;
};

const getAll = async ({
    limit,
    offset,
}: PaginationOption): Promise<{ count: number; categories: Category[] }> => {
    const count = await db.category.count();
    const categories = await db.category.findMany({
        skip: offset,
        take: limit,
    });
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
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
            // Field {name} is too long.
            if (error.code === 'P2000') {
                throw new Error('The category name is too long.');
            }
            // Unique constraint error.
            if (error.code === 'P2002') {
                throw new Error('This category already exist.');
            }
        }
    }
};

const update = async (data: CategoryData) => {
    try {
        const newCategory = await db.category.update({ data, where: { id: data.id } });
        return newCategory;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
            // Field {name} is too long.
            if (error.code === 'P2000') {
                throw new Error('The category name is too long.');
            }
            // Unique constraint error.
            if (error.code === 'P2002') {
                throw new Error('This category already exist.');
            }
        }
    }
};

const destroy = async (id: number) => {
    try {
        const deletedCategory = await db.category.delete({ where: { id } });
        return deletedCategory;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Unique constraint error.
            if (error.code === 'P2025') {
                throw new Error('This category does not exist.');
            }
        }
    }
};

const Category = { getAll, getById, create, update, destroy };

export default Category;
