## leal_test_tech Info
Prueba tecnica de  desarrollo para LEAL


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
6) Para ejecutar las pruebas se debe tener en cuenta:
    6.1) Primero Crear el usuario (la billetera se crea automaticamente y se registra con el id del usuario)
    6.2) Segundo Crear el comercio
    6.3) Tercero Crear la sucursal (con el mismo id del comercio)
    6.4) Cuarto Crear la campaña (con el mismo id del comercio y la sucursal)