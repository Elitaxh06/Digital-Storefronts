create or replace function fn_listar_negocios_by_admin(
  p_admin_id INT
)
returns table(
  negocioid int,
  nombre varchar,
  descripcion text,
  email varchar,
  telefono int,
  direccion text,
  red_social_1 text,
  red_social_2 text,
  img_url_1 text, 
  img_url_2 text,
  img_url_3 text,
  estado boolean,
  id_categoria int,
  msj_tipo text,
  msj_texto text 
)
as $$
begin
  -- validar parametro
  if p_admin_id <= 0 then
    return query
    select
      NULL::INT, NULL::VARCHAR, NULL::TEXT, NULL::VARCHAR, NULL::INT,
      NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT,
      NULL::BOOLEAN, NULL::INT,
      'warning', 'Debes ingresar un ID válido.';
    return;
    end if;

    --validar si existe el admin
    if exists (select 1 from t_admins a where a.adminid = p_admin_id) then

      -- validar si existen negocios de ese admin
      if EXISTS (SELECT 1 FROM T_Negocios n WHERE n.id_admin = p_admin_id) THEN
        RETURN QUERY
        SELECT 
          n.NegocioID, n.Nombre, n.Descripcion, n.Email, n.Telefono,
          n.Direccion, n.Red_social_1, n.Red_social_2,
          n.Img_url_1, n.Img_url_2, n.Img_url_3,
          n.Estado, n.id_categoria,
          'success', 'Negocios encontrados correctamente.'
        FROM T_Negocios n
        WHERE n.id_admin = p_admin_id;
      else
        return query
        select 
          NULL::INT, NULL::VARCHAR, NULL::TEXT, NULL::VARCHAR, NULL::INT,
          NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT,
          NULL::BOOLEAN, NULL::INT,
          'warning', 'No se encontraron negocios para este administrador.';
      end if;
    ELSE
      RETURN QUERY
      SELECT 
        NULL::INT, NULL::VARCHAR, NULL::TEXT, NULL::VARCHAR, NULL::INT,
        NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT,
        NULL::BOOLEAN, NULL::INT,
        'warning', 'No se encontró ningún administrador con ese ID.';
    END IF;

    EXCEPTION
      WHEN OTHERS THEN
      RETURN QUERY
      SELECT 
        NULL::INT, NULL::VARCHAR, NULL::TEXT, NULL::VARCHAR, NULL::INT,
        NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT,
        NULL::BOOLEAN, NULL::INT, NULL::INT,
        'error', 'Error inesperado: ' || SQLERRM;   
      
end;
$$ language plpgsql