
-- Crear Tabla de Comercio
create table comercio (
id_com serial primary key,
nombre_com varchar (50)
);

-- Crear tabla usuarios
create table usuarios (
 id_usu SERIAL primary key,
 nameuser varchar(50),
 cc INT
);

-- Crear tabla billetera

create table billetera (
id_bil serial primary key,
coins integer,
id_usu int,
foreign key (id_usu) references usuarios(id_usu)
);


-- Crear tabla sucursales
CREATE TABLE sucursales (
id_suc SERIAL PRIMARY key,
namesuc varchar(50),
id_com int,
foreign key (id_com) references comercio(id_com)
);



-- Crear tabla campaña
create table campain (
id_cam serial primary key,
nombre_cam varchar(50),
id_suc int,
foreign key (id_suc) references sucursales(id_suc),
id_com int,
foreign key (id_com) references comercio(id_com)
);

-- Alterar billetera
alter table billetera 
add column id_com int, 
add constraint fk_commerce 
FOREIGN KEY (id_com) REFERENCES comercio(id_com);