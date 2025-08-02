create or replace function insertar_admin(
  p_nombre varchar,
  p_apellidos varchar,
  p_email varchar,
  p_telefono int,
  p_id_usuario_supabase uuid,
  p_estado boolean default true
)
returns table(
  msj_tipo text, msj_texto text
)
as $$
begin
  --validar campos obligatorios
  if trim(p_nombre) = '' or trim(p_apellidos) = '' or trim(p_email) = '' or length(cast(p_telefono as varchar)) <> 8 then
  return query 
    select 'warning', 'Debe completar nombre, apellidos, email y el numero tiene que tener 8 digitos.';
    return;
  end if;
  begin
    insert into t_admins (Nombre, Apellidos, Email, Telefono, Estado, id_usuario_supabase)
    values(p_nombre, p_apellidos, p_email, p_telefono, p_estado, p_id_usuario_supabase);
    return query
      select 'success', 'Admin insertado correctamente.';
      return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;

select * from insertar_admin('Esteban', 'Pizarro', 'eliaspizarro11@gmail.com', 83745485, true)


create or replace function insertar_categoria(
  p_nombre varchar,
  p_estado boolean default true
)
returns table(
  msj_tipo text, msj_texto text
)
as $$
begin
  --validar campos obligatorios
  if trim(p_nombre) = '' then
  return query 
    select 'warning', 'Debe completar el nombre de la categoria.';
    return;
  end if;
  begin
    insert into t_categorias (Nombre,Estado)
    values(p_nombre, p_estado);
    return query
      select 'success', 'Categoria insertada correctamente.';
      return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;


select * from insertar_categoria('Tecnología')

select * from t_categorias

DROP FUNCTION IF EXISTS insertar_negocio(
  varchar,
  text,
  varchar,
  int,
  text,
  text,
  text,
  text,
  text,
  text,
  int,
  int,
  boolean
);

create or replace function insertar_negocio(
  p_nombre varchar,
  p_descripcion text,
  p_email varchar,
  p_telefono int,
  p_direccion text,
  p_red_social_1 text,
  p_red_social_2 text,
  p_img_url_1 text,
  p_id_admin int,
  p_id_categoria int,
  p_img_url_2 text default null,
  p_img_url_3 text default null,
  p_estado boolean default true
)
returns table(
  msj_tipo text, msj_texto text
)
as $$
begin
  --validar campos obligatorios
  if trim(p_nombre) = '' 
   or trim(p_descripcion) = ''
   or trim(p_email) = '' 
   or length(cast(p_telefono as varchar)) <> 8 
   or trim(p_direccion) = '' 
   or trim(p_red_social_1) = '' 
   or trim(p_red_social_2) = '' 
   or trim(p_img_url_1) = '' 
   or p_id_admin is null 
   or p_id_categoria is null then
  return query 
    select 'warning', 'Debe completar el nombre, descipcion, email, telefono, direccion, redes sociales, imagenes, el admin y la categoria';
    return;
  end if;
  begin
    insert into t_negocios (
        Nombre, Descripcion, Email, Telefono, Direccion, Red_social_1, Red_social_2, Img_url_1, Img_url_2, Img_url_3, Estado, id_admin, id_categoria
    )  
    values( p_nombre, p_descripcion, p_email, p_telefono, p_direccion, p_red_social_1, p_red_social_2, p_img_url_1, p_img_url_2, p_img_url_3, p_estado, p_id_admin, p_id_categoria);
    return query
      select 'success', 'Negocio insertado correctamente.';
      return;

    exception when others then
    return query
    select 'error', 'Error al insertar: ' || sqlerrm;
    return;
  end;
end;
$$ language plpgsql;