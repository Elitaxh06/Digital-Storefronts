create or replace function fn_listar_admin()
returns table(
  id INT, 
  nombre varchar,
  apellidos varchar,
  email varchar,
  telefono int,
  fecha_registro timestamp,
  estado boolean,
	id_usuario_supabase UUID,
  msj_tipo TEXT,
  msj_texto text
)
language plpgsql
as $$
  begin
    IF exists (Select 1 from t_admins) then
      return query 
      select t.adminid,
            t.nombre,
            t.apellidos,
            t.email,
            t.telefono,
            t.fecha_registro,
            t.estado,
						t.id_usuario_supabase,
            'success' as msj_tipo,
            'Exito al realizar la accion' as msj_texto
        From t_admins t;
    else  
      return query 
      select 
        NULL::INT,
			  NULL::VARCHAR,
			  NULL::VARCHAR,
        NULL::VARCHAR,
        NULL::INT,
			  NULL::TIMESTAMP,
			  NULL::BOOLEAN,
				NULL::uuid,
			  'warning' AS msj_tipo,
			  'Actualmente no hay administradores registrados.' AS msj_texto;
    END if;
      EXCEPTION WHEN OTHERs then
        RETURN query  
          SELECT 
          NULL::INT,
			    NULL::VARCHAR,
			    NULL::VARCHAR,
          NULL::VARCHAR,
          NULL::INT,
			    NULL::TIMESTAMP,
			    NULL::BOOLEAN,
					NULL::uuid,
			    'error' AS msj_tipo,
			    sqlerrm AS msj_texto;
    end
$$
DROP FUNCTION fn_listar_admin()

DROP FUNCTION IF EXISTS fn_listar_negocio();
CREATE OR REPLACE FUNCTION fn_listar_negocio()
RETURNS TABLE(
	id INT,
	nombre VARCHAR,
	descripcion TEXT,
	email VARCHAR,
	direccion TEXT,
	Red_social_1 text,
  Red_social_2 text,
	img_url_1 TEXT,
	img_url_2 TEXT,
	img_url_3 TEXT,
	telefono INT,
	estado BOOLEAN,
	id_admin INT,
	nombre_admin VARCHAR,
	nombre_categoria VARCHAR,
	msj_tipo TEXT,
	msj_texto TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
	IF EXISTS (SELECT 1 FROM T_Negocios) THEN 
		RETURN QUERY
		SELECT 
			N.NegocioID,
			N.Nombre,
			N.Descripcion,
			N.Email,
			N.direccion,
			N.Red_social_1,
  		N.Red_social_2,
			N.Img_url_1,
			N.Img_url_2,
			N.Img_url_3,
			N.Telefono,
			N.Estado,
			N.id_admin,
			A.Nombre AS nombre_admin,
			C.Nombre AS nombre_categoria,
			'success'::TEXT AS msj_tipo,
			'Éxito al realizar la acción'::TEXT AS msj_texto
		FROM T_Negocios N
		JOIN T_Categorias C ON N.id_categoria = C.CategoriaID
		LEFT JOIN T_Admins A ON N.id_admin = A.AdminID;
	ELSE
		RETURN QUERY
		SELECT 
			NULL::INT,
			NULL::VARCHAR,
			NULL::TEXT,
			NULL::VARCHAR,
			NULL::TEXT,
			NULL::TEXT,
			NULL::TEXT,
			NULL::TEXT,
			NULL::TEXT,
			NULL::TEXT,
			NULL::INT,
			NULL::BOOLEAN,
			NULL::INT,
			NULL::VARCHAR,
			NULL::VARCHAR,
			'warning'::TEXT AS msj_tipo,
			'Actualmente no hay negocios registrados.'::TEXT AS msj_texto;
	END IF;

EXCEPTION WHEN OTHERS THEN 
	RETURN QUERY 
	SELECT 
		NULL::INT,
		NULL::VARCHAR,
		NULL::TEXT,
		NULL::VARCHAR,
		NULL::TEXT,
		NULL::TEXT,
		NULL::TEXT,
		NULL::TEXT,
		NULL::TEXT,
		NULL::TEXT,
		NULL::INT,
		NULL::BOOLEAN,
		NULL::INT,
		NULL::VARCHAR,
		NULL::VARCHAR,
		'error'::TEXT AS msj_tipo,
		SQLERRM::TEXT AS msj_texto;
END;
$$;

create or replace function fn_listar_negocio_por_id(
	p_negocioid int
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
  id_admin int,
  id_categoria int,
  img_url_2 text,
  img_url_3 text,
  estado boolean,
	msj_tipo text,
	msj_texto text
)
as $$
begin
		if p_negocioid is null or p_negocioid <= 0 then
		return query
		select 
			NULL::INT,
      NULL::VARCHAR, NULL::TEXT, NULL::VARCHAR, NULL::INT, NULL::TEXT,
      NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::INT, NULL::INT,
      NULL::TEXT, NULL::TEXT, NULL::BOOLEAN,
			'warning', 'Debes ingresar un id valido.';
		return;
		end if;
		
		return query
		select
			n.negocioid,
			n.nombre,
    	n.descripcion,
    	n.email,
    	n.telefono,
    	n.direccion,
    	n.red_social_1,
    	n.red_social_2,
    	n.img_url_1,
    	n.id_admin,
    	n.id_categoria,
    	n.img_url_2,
    	n.img_url_3,
    	n.estado,
			'success', 'Negocio encontrado correctamente'
		from t_negocios n
		where n.negocioid = p_negocioid;

		IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      NULL::INT,
      NULL::VARCHAR, NULL::TEXT, NULL::VARCHAR, NULL::INT, NULL::TEXT,
      NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::INT, NULL::INT,
      NULL::TEXT, NULL::TEXT, NULL::BOOLEAN,
      'warning',
      'No se encontró un negocio con ese id';
  	END IF;


		EXCEPTION WHEN OTHERS THEN
  -- Caso: error inesperado
  RETURN QUERY
  SELECT 
    	NULL::INT,
      NULL::VARCHAR, NULL::TEXT, NULL::VARCHAR, NULL::INT, NULL::TEXT,
      NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::INT, NULL::INT,
      NULL::TEXT, NULL::TEXT, NULL::BOOLEAN,
    'error',
    'Error interno al listar el negocio';
end;
$$ language plpgsql

