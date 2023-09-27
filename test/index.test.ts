import request from "supertest";
import express, { Application } from "express";
import { UserService } from "../src/application/use_case/app.service";
import { InMemoryUserRepository } from "../src/infraestructure/adapters/app.repository"; // Reemplaza 'path-to-your' con la ruta correcta
import {
  CreateCampain,
  CreateUser,
  updateCash,
  updateCommerceCash,
} from "../src/domain/request.dto"; // Reemplaza 'path-to-your' con la ruta correcta

const app: Application = express();
const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

// Agrega tus rutas aquí, similar a como lo has hecho en tu aplicación

// Ejemplo de prueba para la ruta /api/UserCreate
describe("/api/UserCreate", () => {
  it("debe crear un nuevo usuario", async () => {
    const user: CreateUser = {
      id_usu: 1,
      nameuser: "userpro",
      cc: 122,
    };
    const response = await request(app).post("/api/UserCreate").send(user);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
  });

  it("debe manejar errores al crear un usuario", async () => {
    // Simula un error en la creación de usuario
    userService.createUser = jest
      .fn()
      .mockRejectedValue(new Error("Error simulado"));

    const user: CreateUser = { id_usu: 1, nameuser: "userpro", cc: 122 };
    const response = await request(app).post("/api/UserCreate").send(user);

    expect(response.status).toBe(500);
    expect(response.text).toContain("Error simulado");
  });
});

describe("/api/CampainCreate", () => {
  it("debe crear un nuevo usuario", async () => {
    const cam: CreateCampain = {
      id_cam: 2,
      nombre_cam: "userpro",
      id_suc: 2,
      id_com: 1,
    };
    const response = await request(app).post("/api/UserCreate").send(cam);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
  });

  it("debe manejar errores al crear un usuario", async () => {
    // Simula un error en la creación de usuario
    userService.createUser = jest
      .fn()
      .mockRejectedValue(new Error("Error simulado"));

    const cam: CreateCampain = {
      id_cam: 2,
      nombre_cam: "userpro",
      id_suc: 2,
      id_com: 1,
    };
    const response = await request(app).post("/api/UserCreate").send(cam);

    expect(response.status).toBe(500);
    expect(response.text).toContain("Error simulado");
  });
});

describe("/api/comerceCash", () => {
  it("debe crear un nuevo usuario", async () => {
    const uCash: updateCommerceCash = {
      id_bil: 1,
      id_com: 1,
    };
    const response = await request(app).post("/api/UserCreate").send(uCash);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
  });

  it("debe manejar errores al crear un usuario", async () => {
    // Simula un error en la creación de usuario
    userService.updateCash = jest
      .fn()
      .mockRejectedValue(new Error("Error simulado"));

    const uCash: updateCommerceCash = {
      id_bil: 1,
      id_com: 1,
    };
    const response = await request(app).post("/api/UserCreate").send(uCash);

    expect(response.status).toBe(500);
    expect(response.text).toContain("Error simulado");
  });
});

describe("/api/coins", () => {
  it("debe crear un nuevo usuario", async () => {
    const cash: updateCash = {
      id_bil: 1,
      coins: 1000,
      id_com: 1,
    };
    const response = await request(app).post("/api/UserCreate").send(cash);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
  });

  it("debe manejar errores al crear un usuario", async () => {
    // Simula un error en la creación de usuario
    userService.updateCash = jest
      .fn()
      .mockRejectedValue(new Error("Error simulado"));

    const cash: updateCash = { id_bil: 0, coins: 1000, id_com: 0 };
    const response = await request(app).post("/api/UserCreate").send(cash);

    expect(response.status).toBe(500);
    expect(response.text).toContain("Error simulado");
  });
});

afterAll(async () => {});
