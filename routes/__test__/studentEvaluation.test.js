import app from "../../";
import request from "supertest";

describe("Student Evaluation", () => {
    //get evaluations by student and month and year

    it("GET /api/evaluations/6616b9376d72ce55680cfa8f", async () => {
        const response = await request(app).post("/api/evaluation/65d810ba000ae9eb902cac8c").send({
            month: "Abril",
            year: "2024"
        });
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    //create evaluation
    it("POST /api/evaluation-create/65d810ba000ae9eb902cac8c", async () => {
        const response = await request(app).post("/api/evaluation-create/65d810ba000ae9eb902cac8c").send({
            trainingType: "Carrera",
            date: "2024-10-01",
            time: "00:30:00",
            distance: 5,
            year: "2024",
            month: "Abril"
        });
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });
});