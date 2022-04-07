import { NotFoundErrorResponse } from '@/resources/Error';
import { PaginationOption, SubjectBodyData } from '@/types';
import { Subject } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import db from '.';

type SubjectResult = {
    id: number;
    name: string;
    content: string;
    author: {
        pseudo: string;
        id: number;
    };
    categories: {
        name: string;
        id: number;
    }[];
};

const subjectSelect = {
    id: true,
    name: true,
    content: true,
    userId: false,
    author: {
        select: { pseudo: true, id: true },
    },
    categories: {
        select: { name: true, id: true },
    },
};

const getAll = async ({
    limit,
    offset,
}: PaginationOption): Promise<{ count: number; subjects: SubjectResult[] }> => {
    const count = await db.subject.count();
    const subjects = await db.subject.findMany({
        skip: offset,
        take: limit,
        select: subjectSelect,
    });
    return { count, subjects };
};

const getById = async (id: number) => {
    const subject = await db.subject.findUnique({ where: { id }, select: subjectSelect });

    return subject;
};

const create = async (data: SubjectBodyData, authorId: number) => {
    try {
        const newSubject = await db.subject.create({
            data: {
                name: data.name,
                content: data.content,
                categories: {
                    connect: data.categories.map((id) => ({ id })),
                },
                author: {
                    connect: {
                        id: authorId,
                    },
                },
            },
            select: subjectSelect,
        });
        return newSubject;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
            if (error.code === 'P2000') {
                throw new Error('The Subject name is too long.');
            }
        }
    }
};

const update = async (subjectId: number, authorId: number, data: SubjectBodyData) => {
    const subject = await db.subject.findFirst({
        where: {
            AND: [{ id: subjectId }, { userId: authorId }],
        },
        select: subjectSelect,
    });

    if (!subject) {
        throw new NotFoundErrorResponse('The subject does not exist.');
    }

    try {
        const updatedSubject = await db.subject.update({
            where: { id: subjectId },
            data: {
                name: data.name,
                content: data.content,
                categories: {
                    disconnect: subject.categories.map(({ id }) => ({ id })),
                    connect: data.categories.map((id) => ({
                        id,
                    })),
                },
            },
            select: subjectSelect,
        });

        return updatedSubject;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
            if (error.code === 'P2000') {
                throw new Error('The Subject name is too long.');
            }
        }
    }
};

const Subject = { getAll, getById, create, update };

export default Subject;
