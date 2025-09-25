create or replace function fn_update_total(
  p_negocioid int,
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
  if p_negocioid is null or p_negocioid <= 0 or p_nombre is null or length(trim(p_nombre)) = 0 or p_estado is null then
    return query
    select 
      'warning', 'Debes ingresar todos los datos obligatorios (Nombre, Estado)';
  else 
    update t_negocios
    set
      nombre = p_nombre,
      descripcion = p_descripcion,
      email = p_email,
      telefono = p_telefono,
      direccion = p_direccion,
      red_social_1 = p_red_social_1,
      red_social_2 = p_red_social_2,
      img_url_1 = p_img_url_1,
      id_admin = p_id_admin,
      id_categoria = p_id_categoria,
      img_url_2 = p_img_url_2,
      img_url_3 = p_img_url_3,
      estado = p_estado
    where negocioid = p_negocioid;
    return query
    select
      'success', 'Negocio actualizado correctamente.';
    end if;
    EXCEPTION WHEN OTHERS THEN
    RETURN QUERY
    SELECT 
        'error'::text, 
        SQLERRM::text;  
end;

$$ language plpgsql

-- DROP FUNCTION fn_update_logical(integer, boolean);
CREATE OR REPLACE FUNCTION fn_update_logical(
    p_negocio int,
    p_estado boolean
)
RETURNS TABLE(
    id_negocio int,
    msj_tipo text,
    msj_texto text
)
AS $$
BEGIN
    IF p_negocio <= 0 OR p_estado IS NULL THEN
        RETURN QUERY
        SELECT NULL::INT, 'warning', 'Debes ingresar los datos obligatorios (ID, ESTADO)';
        RETURN;
    END IF;

    UPDATE t_negocios
    SET estado = p_estado
    WHERE negocioid = p_negocio;

        -- Verificamos si se actualizó alguna fila
    IF FOUND THEN
        RETURN QUERY
        SELECT p_negocio, 'success', 'Negocio actualizado correctamente';
    ELSE
        RETURN QUERY
        SELECT NULL::INT, 'warning', 'No existe un negocio con ese ID';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY
        SELECT NULL::INT, 'error', 'Error inesperado: ' || SQLERRM;
END;
$$ LANGUAGE plpgsql;