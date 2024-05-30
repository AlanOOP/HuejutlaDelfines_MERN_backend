import app from "../..";
import request from "supertest";

describe("MonthlyPayment API", () => {
    it("GET m", async () => {
        const response = await request(app).get("/api/payments/6616b9376d72ce55680cfa8f");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        expect(response.status).not.toBe(404);
    });

    //create-membership-order
    it("POST /api/create-membership-order", async () => {
        const response = await request(app).post("/api/create-membership-order").send({
            id_student: "65d810ba000ae9eb902cac8c",
            fecha: "18/04/2024",
            amount: 300
        });
        // expect(response.status).toBe(200);
        // expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

        // expect(response.status).not.toBe(404);
    });
});