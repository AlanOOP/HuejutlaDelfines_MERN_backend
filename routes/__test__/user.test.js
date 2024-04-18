import app from "../..";
import request from "supertest";

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

});