import app from '..';
import request from 'supertest';

describe('Test API', () => {
    it('GET /api/courses', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200)
        // expect(response.body).toEqual([])
    })
})


describe("Test API User Endpoint", () => {
    it("GET /api/users", async () => {
        const response = await request(app).get("/api/users");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(response.status).not.toBe(404);
    });

    //singUp 
    it("SingUp User", async () => {
        const response = await request(app).post("/api/singUp").send({
            email: "20211021@uthh.edu.mx",
            password: "Alanalexis18#"
        });

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(response.status).not.toBe(404);
    })

    //singIn

    // it("SingIn User", async () => {
    //     const response = await request(app).post("/api/singIn").send({
    //         name: "Emilio",
    //         lastName: "Hernandez",
    //         password: "Pajarito133#",
    //         age: 20,
    //         email: "pajarito@gmail.com",
    //         phone: "7717128042"
    //     });

    //     expect(response.status).toBe(200);
    //     expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
    //     expect(response.status).not.toBe(404);
    // });
});