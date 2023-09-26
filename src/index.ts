import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";

import dotenv from "dotenv";
import {
  CreateCommerce,
  CreateUser,
  CreateCampain,
  CreateSuc,
  updateCash,
  updateCommerceCash,
} from "./domain/request.dto";
import { UserService } from "./application/use_case/app.service";
import { InMemoryUserRepository } from "./infraestructure/adapters/app.repository";

import { usuarios } from "./domain/db.model";
import sequelize from "./infraestructure/adapters/database.adapter";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

/**
 * @swagger
 * /api/UserCreate:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       description: Datos del usuario a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error en la solicitud
 */

app.post("/api/UserCreate", async (req, res) => {
  try {
    const user: CreateUser = req.body;
    const newUser = await userService.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.put("/api/coins", async (req, res) => {
  try {
    const cash: updateCash = req.body;
    const resCash = await userService.updateCash(cash);
    res.status(201).send(resCash);
  } catch (error) {
    console.log(`Error en metodo ${error}`);
    res.status(500).send(error);
  }
});

app.put("/api/comerceCash", async (req, res) => {
  try {
    const cashCommer: updateCommerceCash = req.body;
    const resCash = await userService.updateCommerceCash(cashCommer);
    res.status(201).send(resCash);
  } catch (error) {
    console.log(`Error en metodo ${error}`);
    res.status(500).send(error);
  }
});

app.post("/api/CampainCreate", async (req, res) => {
  try {
    const camp: CreateCampain = req.body;
    const resCamp = await userService.createCampain(camp);
    res.status(201).send(resCamp);
  } catch (error) {
    console.log(`Error en metodo ${error}`);
    res.status(500).send(error);
  }
});

app.post("/api/ComerceCreate", async (req, res) => {
  try {
    const comm: CreateCommerce = req.body;
    const resCommerce = await userService.createCommerce(comm);
    res.status(201).send(resCommerce);
  } catch (error) {
    console.log(`Error en metodo ${error}`);
    res.status(500).send(error);
  }
});

app.post("/api/SucCreate", async (req, res) => {
  try {
    const sucu: CreateSuc = req.body;
    const reSuc = await userService.createSuc(sucu);
    res.status(201).send(reSuc);
  } catch (error) {
    console.log(`Error en metodo ${error}`);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios.
 *     description: Obtiene una lista de todos los usuarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *         content:
 *           application/json:
 *             example:
 *               usuarios: [
 *                 { id: 1, nombre: 'Usuario 1' },
 *                 { id: 2, nombre: 'Usuario 2' }
 *               ]
 */

app.get("/api/Campanas", async (_, res) => {
  const users = await userService.getCampains();
  res.json(users);
});

app.get("/api/Users", async (_, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

app.listen(port, () => {
  console.log(
    `Aplicacion ${process.env.APPNAME} escuchando en el puerto ${port}`
  );
});
const options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: `${process.env.APPNAME}`,
      version: "1.0.0",
      description: "API de prueba para leal Developer: Nicolas Perdomo",
    },
    components: {
      schemas: {
        ComerceCreate: {
          type: "object",
          properties: {
            id_com: { type: "number" },
            nombre_com: { type: "string" },
          },
        },
        SucCreate: {
          type: "object",
          properties: {
            id_suc: { type: "number" },
            namesuc: { type: "string" },
            id_com: { type: "number" },
          },
        },
        UserCreate: {
          type: "object",
          properties: {
            id_usu: { type: "number" },
            nameuser: { type: "string" },
            cc: { type: "number" },
          },
        },
        CampainCreate: {
          type: "object",
          properties: {
            id_cam: { type: "number" },
            nombre_cam: { type: "string" },
            id_suc: { type: "number" },
            id_com: { type: "number" },
          },
        },
        coins: {
          type: "object",
          properties: {
            id_bil: { type: "number" },
            coins: { type: "number" },
            id_com: { type: "number" },
          },
        },
        comerceCash: {
          type: "object",
          properties: {
            id_bil: { type: "number" },
            id_com: { type: "number" },
          },
        },
        Campanas: {
          type: "Get",
        },
        Users: {
          type: "Get",
        },
      },
    },
  },
  apis: ["./server.ts"], // Especifica los archivos que contienen las anotaciones JSDoc
};
const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
