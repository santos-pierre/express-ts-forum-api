import db from '@/models/index';
import request from 'supertest';
import { generateCategory } from './../utils';
import { app } from '../../server';

afterAll(async () => {
    await db.category.deleteMany({ where: {} });
    await generateCategory(db);
    await db.$disconnect();
});

beforeAll(async () => {
    await db.category.deleteMany({ where: {} });
    await generateCategory(db);
});

test('GET /category', async () => {
    const res = await request(app).get('/api/category');

    expect(res.body).toHaveProperty('status', 200);
    expect(res.body).toHaveProperty('count', 5);
    expect(res.body).toHaveProperty('results');
    expect(res.status).toBe(200);
});

test('GET /category with limit 2', async () => {
    const res = await request(app).get('/api/category?limit=2');
    expect(res.body).toHaveProperty('status', 200);
    expect(res.body.count).toBe(5);
    expect(res.body.results.length).toBe(2);
});
