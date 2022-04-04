import db from '@/models/index';
import request from 'supertest';
import { app, server } from '../../server';

afterAll(async () => {
    await db.$disconnect();
    server.close();
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

// test('GET /Category', async () => {
//     const res = await request(app).get('/api/category');
//     expect(res.body.results).toContain({ name: 'javascript' });
//     return expect(res.status).toBe(200);
// });
