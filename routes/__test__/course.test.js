import app from "../..";
import request from "supertest";


describe("Test API", () => {
    it("GET /api/courses", async () => {
        const response = await request(app).get("/api/courses");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);

    });

    it("GET Course by Id", async () => {
        const response = await request(app).get("/api/courses/65dd558bec03f0c2db3681cf");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    //activate course

    it("Activate Course", async () => {
        const response = await request(app).put("/api/courses/activate/65dd558bec03f0c2db3681cf");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    //desactive course

    it("Desactivate Course", async () => {
        const response = await request(app).put("/api/courses/desactivate/65dd558bec03f0c2db3681cf");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    //search course query

    it("Search Course", async () => {
        const response = await request(app).post("/api/courses/search").query({ title: "curso" });
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    //search course category or active or inactive

    it("Search Course Category", async () => {
        const response = await request(app).post("/api/courses/search/category").query({ category: "programacion", active: true });
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(response.status).not.toBe(404);
    });
});
