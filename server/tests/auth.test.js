import request from "supertest";
import app, { server } from "../index.js";
import  pool  from "../db.js";

// Usuarios existentes en tu BD:
// librarian → bibliotecario1 / 1234
// student   → alumno1 / 1234

describe("Pruebas del Login con roles", () => {
  test("Debe rechazar login vacío", async () => {
    const res = await request(app).post("/api/login").send({});
    expect(res.statusCode).toBe(401);
  });

  test("Debe rechazar credenciales incorrectas", async () => {
    const res = await request(app).post("/api/login").send({
      name: "alumno1",
      password: "xxxx",
    });
    expect(res.statusCode).toBe(401);
  });

  test("Debe permitir login correcto del bibliotecario", async () => {
    const res = await request(app).post("/api/login").send({
      name: "bibliotecario1",
      password: "1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.role).toBe("librarian");
  });

  test("Debe permitir login correcto del alumno", async () => {
    const res = await request(app).post("/api/login").send({
      name: "alumno1",
      password: "1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.role).toBe("student");
  });
});

// Cerrar conexiones después de las pruebas
afterAll(async () => {
  await pool.end();
  if (server) server.close();
});
