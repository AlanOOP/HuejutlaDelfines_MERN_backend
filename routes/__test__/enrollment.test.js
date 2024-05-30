import app from "../..";
import request from "supertest";

describe("Enrollment API", () => {
    it("GET /api/enrollments", async () => {
        const response = await request(app).get("/api/enrollments");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    it("GET /api/enrollment/66159f75130720df16137ce2", async () => {
        const response = await request(app).get("/api/enrollment/66159f75130720df16137ce");
        expect(response.status).toBe(200);
        expect(response.status).not.toBe(404);
    });

    //order enrollment

    it("POST /api/enrollment", async () => {
        const response = await request(app).post("/api/enrollment").send({
            id_student:"6620b7f1bb67d25437d46383",
            id_course:"65dd558bec03f0c2db3681cf",
            amount:100
        })

        // expect(response.status).toBe(200);
        // expect(response.status).not.toBe(404);


    });

    
});