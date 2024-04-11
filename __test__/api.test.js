import { app } from '../src/app';
import request from 'supertest';

describe('POST /api/loginIn', () => {
    it('should return a 200 status code and a success message', async () => {
        const response = await request(app)
            .post('/api/loginIn')
            .send({
                email: '20211021@uthh.edu.mx',
                password: 'Alanalexis18'
            });

        expect(response.status).toBe(200);
        // expect(response.body.message).toBe('Success');

        //not expect

        expect(response.body.message).not.toBe('Error');
        expect(response.body.message).not.toBe('Error, user not found');
        expect(response.body.message).not.toBe('Error, password incorrect');
        expect(response.status).not.toBe(400);

    });


});

//test register
