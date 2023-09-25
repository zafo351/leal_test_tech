import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from './domain/data';
import { UserService } from './application/use_case/app.service';
import { InMemoryUserRepository } from './infraestrcuture/adapters/app.repository';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST ||'localhost', 
  username: process.env.DB_USER, 
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME, 
  models: [__dirname + '/models'], 
});

export default sequelize;
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       description: Datos del usuario a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error en la solicitud
 */

app.post('/users', async (req, res) => {
  const user: User = req.body;
  await userService.createUser(user);
  res.status(201).send('User created');
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await userService.getUserById(userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
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

app.get('/users', async (_, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser: User = req.body;
  updatedUser.id = userId; // Ensure the ID matches the URL param
  await userService.updateUser(updatedUser);
  res.send('User updated');
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  await userService.deleteUser(userId);
  res.send('User deleted');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});



const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API para administrar usuarios',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./server.ts'], // Especifica los archivos que contienen las anotaciones JSDoc
};
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));