import request from "supertest";
import app from "../index.js";

let createdId = null;

describe("Pruebas de libros (tasks)", () => {

  test("Debe crear un libro", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Libro de prueba",
        description: "Descripción de prueba",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");

    createdId = res.body.id;
  });

  test("Debe obtener todos los libros", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Debe actualizar un libro", async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdId}`)
      .send({ title: "Nuevo Título" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Nuevo Título");
  });

  test("Debe eliminar un libro", async () => {
    const res = await request(app).delete(`/api/tasks/${createdId}`);
    expect(res.statusCode).toBe(204);
  });

});
