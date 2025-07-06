create or replace function fn_listar_admins()
returns table(
	id INT,
	nombre VARCHAR,
	email VARCHAR,
	fecha_registro TIMESTAMP,
	estado BOOLEAN,
	apellidos VARCHAR,
	msj_tipo TEXT,
	msj_texto TEXT
)
language plpgsql
as $$
	BEGIN 
	IF EXISTS (SELECT 1 FROM T_Admins) THEN 
		RETURN QUERY
		SELECT AdminID, Nombre, Email, Fecha_Registro, Estado, Apellidos,
			'success' AS msj_tipo,
			'Éxito al realizar la acción' AS msj_texto
		FROM T_Admins;
	ELSE
		RETURN QUERY
		SELECT 
			NULL::INT,
			NULL::VARCHAR,
			NULL::VARCHAR,
			NULL::TIMESTAMP,
			NULL::BOOLEAN,
			NULL::VARCHAR,
			'warning' AS msj_tipo,
			'Actualmente no hay administradores registrados.' AS msj_texto;
	END IF;
		EXCEPTION WHEN OTHERS THEN 
		RETURN query 
		  SELECT 
    		NULL::INT, 
    		NULL::VARCHAR, 
    		NULL::VARCHAR,
    		NULL::VARCHAR,
    		NULL::TIMESTAMP,
    		NULL::BOOLEAN,
			NULL::VARCHAR,
    		'error' AS msj_tipo,
    		SQLERRM AS msj_texto;
	END;
$$;


select * from fn_listar_admins()

drop function if exists fn_listar_negocio()
create or replace function fn_listar_negocio()
returns table(
	id INT,
	descripcion TEXT,
	email VARCHAR,
	img_url TEXT,
	estado BOOLEAN,
	id_admin INT,
	nombre_categoria VARCHAR,
	nombre VARCHAR,
	msj_tipo TEXT,
	msj_texto TEXT
)
language plpgsql
as $$
	BEGIN 
	IF EXISTS (SELECT 1 FROM T_Negocios) THEN 
		RETURN QUERY
		SELECT 
			N.NegocioID,
			N.Descripcion,
			N.Email,
			N.Img_url,
			N.Estado,
			N.id_admin,
			C.Nombre AS nombre_categoria,
			N.Nombre,
			'success' AS msj_tipo,
			'Exito al realizar la accion' AS msj_texto
		FROM T_Negocios N
		JOIN T_Categorias C ON N.id_categoria = C.CategoriaID;
	ELSE
		RETURN QUERY
		SELECT 
			NULL::INT,
            NULL::TEXT,
            NULL::VARCHAR,
            NULL::TEXT,
            NULL::BOOLEAN,
            NULL::INT,
            NULL::VARCHAR,
			NULL::VARCHAR,
            'warning' AS msj_tipo,
            'Actualmente no hay negocios registrados.' AS msj_texto;
	END IF;
		EXCEPTION WHEN OTHERS THEN 
		RETURN query 
		  SELECT 
    		 NULL::INT,
            NULL::TEXT,
            NULL::VARCHAR,
            NULL::TEXT,
            NULL::BOOLEAN,
            NULL::INT,
            NULL::VARCHAR,
			NULL::VARCHAR,
            'error' AS msj_tipo,
            SQLERRM AS msj_texto;
	END;
$$;

select * from fn_listar_negocio()
