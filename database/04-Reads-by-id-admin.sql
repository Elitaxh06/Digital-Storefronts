CREATE OR REPLACE FUNCTION fn_listar_admin_id(
  p_admin_id int
)
returns table(
  adminid INT,
  nombre VARCHAR,
  apellidos VARCHAR,
  email VARCHAR,
  telefono INT,
  fecha_registro TIMESTAMP,
  estado BOOLEAN,
  id_usuario_supabase UUID,
  msj_tipo TEXT,
  msj_texto TEXT
)
as $$
begin
  IF p_admin_id <= 0 then
  return query 
  SELECT  NULL::INT, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, NULL::INT,
      NULL::TIMESTAMP, NULL::BOOLEAN, NULL::UUID, 'warning', 'Debes ingresar un ID válido.';
  return;
  end if;

  if exists(select 1 from t_admins t where t.adminid = p_admin_id) then
  return query
  SELECT 
      t.adminid, t.nombre, t.apellidos, t.email, t.telefono, t.fecha_registro, t.estado, t.id_usuario_supabase,
      'success', 'Administrador encontrado correctamente.'
    FROM t_admins t
    WHERE t.adminid = p_admin_id;
  else 
  return query
  SELECT 
     NULL::INT, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, NULL::INT,
      NULL::TIMESTAMP, NULL::BOOLEAN, NULL::UUID,
      'warning', 'No se encontró ningún administrador con ese ID.';
  END IF;

  EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY
    SELECT 
      NULL::INT, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, NULL::INT,
      NULL::TIMESTAMP, NULL::BOOLEAN, NULL::UUID,
      'error', 'Error inesperado: ' || SQLERRM;
end
$$ language plpgsql;

SELECT * FROM fn_listar_admin_id(5);
