import app from '..';
import request from 'supertest';

describe('Test API', () => {
    it('GET /api/courses', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200)
        // expect(response.body).toEqual([])
    })
})

// describe('Nuestro primer test', () => {
//     it('Debería retornar un objeto con un mensaje de bienvenida', () => {
//         expect(1 + 1).toBe(2)
//     })
// })