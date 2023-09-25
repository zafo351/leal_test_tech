CREATE TABLE usuarios (
 id_usu SERIAL PRIMARY key,
 nameuser varchar(50),
 cc INT
);
create table billetera (
id_bil serial primary key,
coins integer,
id_usu int,
foreign key (id_usu) references usuarios(id_usu)
);

CREATE TABLE SUCURSALES (
id_suc SERIAL PRIMARY key,
namesuc varchar(50)
);
   	
create table campain (
id_cam serial primary key,
nombre_cam varchar(50),
id_suc int,
foreign key (id_suc) references sucursales(id_suc)
);

create table COMERCIO (
id_com serial primary key,
nombre_com varchar (50),
id_usu int,
foreign key (id_usu) references usuarios(id_usu),
id_cam int,
foreign key (id_cam) references campain(id_cam),
id_suc int,
foreign key (id_suc) references sucursales(id_suc)
);

ALTER TABLE billetera
add CONSTRAINT fk_usuarios
FOREIGN KEY (id_usu) REFERENCES usuarios(id_usu);

ALTER TABLE billetera
add column id_com int,
ADD CONSTRAINT fk_comercio
FOREIGN KEY (id_com) REFERENCES comercio(id_com);

ALTER TABLE sucursales 
add column id_com int,
ADD CONSTRAINT fk_comercio
FOREIGN KEY (id_com) REFERENCES comercio(id_com);

ALTER TABLE sucursales 
add column id_cam int,
ADD CONSTRAINT fk_campain
FOREIGN KEY (id_cam) REFERENCES campain(id_cam);

ALTER TABLE campain 
add column id_com int,
ADD CONSTRAINT fk_comercio
FOREIGN KEY (id_com) REFERENCES comercio(id_com);