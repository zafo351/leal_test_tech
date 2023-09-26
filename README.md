## leal_test_tech Info
Prueba tecnica de  desarrollo para LEAL


![Modelo Relacional de la base de datos](https://github.com/zafo351/leal_test_tech/blob/main/DBModel.png)


## Configuration 

1) Ejecutar el comando para instalar dependencias:
```bash
    $ npm i 
```
2) Ejecutar el comando para compilar la aplicacion:
```bash
    $ npm tsc 
```

3) Ejecutar comando para subir la base de datos:
```bash
    $ docker-compose up
```

4) Ejecutar comandos de actualizacion ORM:
```bash
    $ npx prisma db pull

    $ npx prisma generate 
```

5) Ejecutar comando para iniciar la aplicacion:
```bash
    $ npm run start:dev
```
6) Adjunto en el repositorio se encuentra el archivo leal_test.postman_collenction.json con la coleccion postman, para ejecutar las pruebas se debe tener en cuenta:

    - Primero Crear el usuario (la billetera se crea automaticamente y se registra con el id del usuario)
    - Segundo Crear el comercio
    - Tercero Crear la sucursal (con el mismo id del comercio)
    - Cuarto Crear la campaña (con el mismo id del comercio y la sucursal)