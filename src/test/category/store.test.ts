import db from '@/models/index';
import request from 'supertest';
import { generateCategory } from '../utils';
import { app } from '../../server';

let bearerTokenAdmin: string;
let bearerTokenUser: string;

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
});

test('/POST category - Admin create new category', async () => {
    const res = await request(app)
        .post('/api/category')
        .send({ name: 'Create as admin' })
        .set('Authorization', `bearer ${bearerTokenAdmin}`);

    expect(res.status).toBe(201);
    expect(res.body.result);
});

test('/POST category - Guest cannot create new category', async () => {
    const res = await request(app).post('/api/category').send({ name: 'Test as guest' });

    expect(res.status).toBe(401);
});

test('/POST category - User cannot create new category', async () => {
    const res = await request(app)
        .post('/api/category')
        .send({ name: 'Test as user' })
        .set('Authorization', `bearer ${bearerTokenUser}`);

    expect(res.status).toBe(403);
});

test('/POST category - Category name too long', async () => {
    const res = await request(app)
        .post('/api/category')
        .send({ name: 'unyKWZn8Z0YJ0T9V8hKYBrmTnkoNSY1btlHC99ltMF2WteLQDOj' })
        .set('Authorization', `bearer ${bearerTokenAdmin}`);

    expect(res.status).toBe(422);
});

test('/POST category - Category name required', async () => {
    const res = await request(app)
        .post('/api/category')
        .send({ name: '' })
        .set('Authorization', `bearer ${bearerTokenAdmin}`);

    expect(res.status).toBe(422);
});
