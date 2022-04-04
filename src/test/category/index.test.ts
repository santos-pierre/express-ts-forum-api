import request from 'supertest';
import app from '../../server';

test('GET /Category', async () => {
    const res = await request(app).get('/api/category');

    expect(res.body).toHaveProperty(['results', 'status', 'count']);
});
