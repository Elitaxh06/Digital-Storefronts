create database tiendaticacr1

create table T_Admins(
  AdminID SERIAL primary key,
  Nombre VARCHAR(150) not null,
  Apellidos VARCHAR(300) not null,
  Email VARCHAR(300) not null,
  Telefono int not null,
  Fecha_Registro timestamp default current_timestamp,
  Estado BOOLEAN default true
)
ALTER TABLE t_admins ADD COLUMN id_usuario_supabase UUID;

create table T_Categorias(
  CategoriaID serial primary key,
  Nombre varchar(200) not null,
  Estado boolean default true
)

create table T_Negocios(
  NegocioID serial primary key,
  Nombre varchar(300) not null,
  Descripcion text not null,
  Email varchar(200) not null,
  Telefono int not null,
  Direccion text not null,
  Red_social_1 text not null,
  Red_social_2 text not null,
  Img_url_1 text not null,
  Img_url_2 text null,
  Img_url_3 text null,
  Estado boolean default true,
  id_admin int,
  id_categoria int,
  constraint fk_admin foreign key(id_admin) references T_Admins(AdminID),
  constraint fk_categoria foreign key(id_categoria) references T_Categorias(CategoriaID)
)