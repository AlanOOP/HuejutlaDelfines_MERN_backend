import app from "../..";
import request from "supertest";

describe("Student API", () => {
    it("GET /api/students", async () => {
        const response = await request(app).get("/api/student");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    it("GET /api/student/65d810ba000ae9eb902cac8c", async () => {
        const response = await request(app).get("/api/student/65d810ba000ae9eb902cac8c");
        expect(response.status).toBe(200);
        expect(response.status).not.toBe(404);
    });


    it("GET getStudentByUser ", async () => {
        const response = await request(app).get("/api/student/user/65d810ba000ae9eb902cac8b");
        expect(response.status).toBe(200);
        expect(response.status).not.toBe(404);
    });

    it("PUT updateProfile ", async () => {
        const response = await request(app).put("/api/student/update/6616b9376d72ce55680cfa8f").send({
            name:"Ana María",
            lastName:"Felipe Redondo",
            phone:"7717128042"
        })

        expect(response.status).toBe(200);
        expect(response.status).not.toBe(404);

    });

});