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

create or replace function fn_listar_negocio()
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

select * from fn_listar_negocio()
