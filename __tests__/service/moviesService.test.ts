const request = require('supertest');
const app = require('../../app');

describe('Movies API routes', () => {
  test('GET /movies returns list with page', async () => {
    const res = await request(app).get('/movies?page=2');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta.page).toBe(2);
  });

  test('GET /movies/:id returns movie details', async () => {
    const res = await request(app).get('/movies/tt2391950');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imdbId).toBe('tt2391950');
  });

  test('GET /movies/abcdefgh returns 404 error', async () => {
    const res = await request(app).get('/movies/abcdefgh');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toHaveProperty('message', 'Movie not found');
  });

  test('GET /movies/year/:year returns list', async () => {
    const res = await request(app).get('/movies/year/2012?page=2&order=asc');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.meta.page).toBe(2);
  });

  test('GET /movies/genre/:genre returns list', async () => {
    const res = await request(app).get('/movies/genre/Documentary?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.meta.page).toBe(1);
  });
});
