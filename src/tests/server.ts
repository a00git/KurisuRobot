import request from 'supertest';
import server from '../server';

describe('http server', () => {
  it('should return html page at /', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
  });

  it('should return 404 for other requests', async () => {
    const response = await request(server).get('/2535');
    expect(response.status).toBe(404);
  });
});
