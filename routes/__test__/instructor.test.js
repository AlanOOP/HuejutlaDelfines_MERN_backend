import app from "../..";
import request from "supertest";


describe("Instructor API", () => {
    it("GET /api/instructor", async () => {
        const response = await request(app).get("/api/instructor");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    // it("POST /api/instructor", async () => {
    //     const response = await request(app).post("/api/instructor").send({
    //         name: "Magos",
    //         lastName: "Hernandez",
    //         password: "GolfodeMexico12",
    //         email: "hugo@gmail.com",
    //         phone: "7717128042",
    //         age: "27",
    //         speciality: "Avanzado"
    //     });
    //     expect(response.status).toBe(404);
    // });
});