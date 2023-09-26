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

app.put("api/cash", async (req, res)=>{
  try{
    
  }catch(error){

  }

});

app.post("/api/CampainCreate", async (req, res) => {
  try {
    const camp: CreateCampain = req.body;
    const resCamp = await userService.createCampain(camp);
    res.status(201).send(resCamp);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post("/api/ComerceCreate", async (req, res) => {
  const comm: CreateCommerce = req.body;
  await userService.createCommerce(comm);
  res.status(201).send("User created");
});

app.post("/api/SucCreate", async (req, res) => {
  const sucu: CreateSuc = req.body;
  await userService.createSuc(sucu);
  res.status(201).send("User created");
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
  const users = await userService.getUsers();
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
        CrearComercio: {
          type: "object",
          properties: {
            id_com: { type: "number" },
            nombre_com: { type: "string" },
            id_cam: { type: "number" },
            id_suc: { type: "number" },
          },
        },
        CrearSucursal: {
          type: "object",
          properties: {
            id_suc: { type: "number" },
            namesuc: { type: "string" },
            id_usu: { type: "number" },
          },
        },
        CrearUsuario: {
          type: "object",
          properties: {
            id_usu: { type: "number" },
            nameuser: { type: "string" },
            cc: { type: "number" },
            id_bill: { type: "number" },
          },
        },
        CrearCampaña: {
          type: "object",
          properties: {
            id_cam: { type: "string" },
            nombre_cam: { type: "string" },
            id_suc: { type: "string" },
            idComercio: { type: "string" },
          },
        },
        ConsultaCampaña: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./server.ts"], // Especifica los archivos que contienen las anotaciones JSDoc
};
const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
