CREATE TABLE IF NOT EXISTS Clientes (
dni varchar(9) NOT NULL PRIMARY KEY, 
nombre varchar(15) default null, 
apellidos varchar(50) default null
);

CREATE TABLE IF NOT EXISTS Peliculas (
titulo varchar(30) NOT NULL PRIMARY KEY, 
director varchar(15)  default null,
año int(4) default null
);

CREATE TABLE IF NOT EXISTS Alquiler(
fecha_alquiler date default null,
fecha_entrega date default null,
dni_cliente varchar(9) NOT NULL, 
titulo_pelicula varchar(30) not null,
PRIMARY KEY(dni_cliente, titulo_pelicula, fecha_alquiler,fecha_entrega),
foreign key (dni_cliente) references Clientes(dni) on delete cascade on update cascade,
foreign key (titulo_pelicula) references Peliculas (titulo) on delete cascade on update cascade
);