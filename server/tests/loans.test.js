import request from "supertest";
import app, { server } from "../index.js";
import  pool  from "../db.js";

describe("Pruebas de préstamos (loans)", () => {
  let createdLoanId;

  test("Debe crear un préstamo", async () => {
    const res = await request(app).post("/api/loans").send({
      bookTitle: "El Principito",
      studentName: "Mario Pérez",
      startDate: "2025-01-10",
      endDate: "2025-01-20",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");

    createdLoanId = res.body.id;
  });

  test("Debe obtener todos los préstamos", async () => {
    const res = await request(app).get("/api/loans");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Debe actualizar un préstamo", async () => {
    const res = await request(app)
      .put(`/api/loans/${createdLoanId}`)
      .send({
        bookTitle: "El Principito (Editado)",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.bookTitle).toBe("El Principito (Editado)");
  });

  test("Debe marcar un préstamo como devuelto", async () => {
    const res = await request(app)
      .put(`/api/loans/${createdLoanId}/return`)
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("devuelto");
  });

  test("Debe eliminar un préstamo", async () => {
    const res = await request(app).delete(`/api/loans/${createdLoanId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Préstamo eliminado");
  });
});

// Cerrar conexiones después de las pruebas
afterAll(async () => {
  await pool.end();
  if (server) server.close();
});
