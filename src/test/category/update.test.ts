import db from '@/models/index';
import request from 'supertest';
import { generateCategory } from '../utils';
import { app } from '../../server';
import { Category } from '@prisma/client';

//TODO Add cleanup db

let bearerTokenAdmin: string;
let bearerTokenUser: string;
let newCategory: Category;

afterAll(async () => {
    await db.category.deleteMany({ where: {} });
    await generateCategory(db);
    db.$disconnect();
});

beforeAll(async () => {
    const adminRes = await request(app).post('/api/login').send({
        identifier: 'admin@admin.com',
        password: 'password',
    });

    bearerTokenAdmin = adminRes.body.result.token;

    const userRes = await request(app).post('/api/login').send({
        identifier: 'user@user.com',
        password: 'password',
    });
    bearerTokenUser = userRes.body.result.token;

    newCategory = await db.category.create({ data: { name: 'Test update' } });
    db.$disconnect();
});

test('/PUT category - Admin can update new category', async () => {
    const res = await request(app)
        .put(`/api/category/${newCategory.id}`)
        .set('Authorization', `bearer ${bearerTokenAdmin}`)
        .send({ name: 'Test update 2' });

    expect(res.status).toBe(200);
    expect(res.body.result.name).toBe('Test update 2');
});

test('/PUT category - User cannot update new category', async () => {
    const res = await request(app)
        .put(`/api/category/${newCategory.id}`)
        .set('Authorization', `bearer ${bearerTokenUser}`)
        .send({ name: 'Test update User' });

    expect(res.status).toBe(403);
});

test('/PUT category - Guest cannot update new category', async () => {
    const res = await request(app).put(`/api/category/${newCategory.id}`).send({ name: 'Test update User' });

    expect(res.status).toBe(401);
});

test('/PUT category - Category name too long ', async () => {
    const res = await request(app)
        .put(`/api/category/${newCategory.id}`)
        .set('Authorization', `bearer ${bearerTokenAdmin}`)
        .send({ name: 'unyKWZn8Z0YJ0T9V8hKYBrmTnkoNSY1btlHC99ltMF2WteLQDOj' });

    expect(res.status).toBe(422);
});

test("/PUT category - 404 category to update doesn't exist", async () => {
    const res = await request(app)
        .put(`/api/category/categoryNotFound`)
        .set('Authorization', `bearer ${bearerTokenAdmin}`)
        .send({ name: 'unyKWZn8Z0YJ0T9V8hKYBrmTnkoNSY1btlHC99ltMF2WteLQDOj' });

    expect(res.status).toBe(404);
});
