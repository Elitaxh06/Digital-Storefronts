create database tiendatica1

create table T_Admins(
	AdminID SERIAL primary key,
	Nombre VARCHAR(150) not null,
	Email VARCHAR(300) not null,
	Fecha_Registro TIMESTAMP default CURRENT_TIMESTAMP,
	Estado BOOLEAN default TRUE
)
alter table T_Admins
add column Apellidos VARCHAR(250) not null


create table T_Provincias(
	ProvinciaID SERIAL primary key,
	Nombre VARCHAR(100) not null,
	Estado BOOLEAN default true
)

create table T_Categorias(
	CategoriaID SERIAL primary key,
	Nombre varchar(200) not null,
	Estado BOOLEAN default true
)

create table T_Negocios(
	NegocioID SERIAL primary key,
	Descripcion TEXT not null,
	Email VARCHAR(300) not null,
	Img_url TEXT not null,
	Estado BOOLEAN default true,
	id_admin INT,
	id_categoria INT,
	constraint fk_admin foreign key (id_admin) references T_Admins(AdminID),
	constraint fk_categoria foreign key (id_categoria) references T_Categorias(CategoriaID)
)

create table T_Sedes(
	SedeID SERIAL primary key,
	Direccion TEXT,
	id_provincia INT,
	id_negocio INT,
	constraint fk_provincia foreign key (id_provincia) references T_Provincias(ProvinciaID),
	constraint fk_negocio foreign key (id_negocio) references T_Negocios(NegocioID)
)




select * from T_Admins





