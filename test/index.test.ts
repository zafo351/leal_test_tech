import request from 'supertest';
import express, { Application } from 'express';
import { UserService } from '../src/application/use_case/app.service';
import { InMemoryUserRepository } from '../src/infraestructure/adapters/app.repository'; // Reemplaza 'path-to-your' con la ruta correcta
import { CreateUser } from '../src/domain/request.dto'; // Reemplaza 'path-to-your' con la ruta correcta

const app: Application = express();
const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

// Agrega tus rutas aquí, similar a como lo has hecho en tu aplicación

// Ejemplo de prueba para la ruta /api/UserCreate
describe('/api/UserCreate', () => {
  it('debe crear un nuevo usuario', async () => {
    const user: CreateUser = {
        "id_usu": 1,
        "nameuser": "userpro",
        "cc": 122
    };
    const response = await request(app)
      .post('/api/UserCreate')
      .send(user);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty({
        "id_usu": 1,
        "nameuser": "userpro",
        "cc": 122
    });
  });

  it('debe manejar errores al crear un usuario', async () => {
    // Simula un error en la creación de usuario
    userService.createUser = jest.fn().mockRejectedValue(new Error('Error simulado'));

    const user: CreateUser = {};
    const response = await request(app)
      .post('/api/UserCreate')
      .send(user);

    expect(response.status).toBe(500);
    expect(response.text).toContain('Error simulado');
  });
});




afterAll(async () => {
  
});
