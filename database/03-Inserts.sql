CREATE OR REPLACE FUNCTION insertar_admin(
    p_nombre VARCHAR,
    p_apellidos VARCHAR,
    p_email VARCHAR,
    p_estado BOOLEAN DEFAULT true
)
RETURNS TABLE (msj_tipo TEXT, msj_texto TEXT) AS $$
BEGIN
    -- Validar campos obligatorios
    IF TRIM(p_nombre) = '' OR TRIM(p_apellidos) = '' OR TRIM(p_email) = '' THEN
        RETURN QUERY
        SELECT 'warning',  'Debe completar nombre, apellidos y email.';
        RETURN;
    END IF;

    BEGIN
        INSERT INTO T_Admins (Nombre, Apellidos, Email, Estado)
        VALUES (p_nombre, p_apellidos, p_email, p_estado);

        RETURN QUERY
        SELECT 'success', 
		'Admin insertado exitosamente.';
        RETURN;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY
        SELECT 'error', 'Error al insertar: ' || SQLERRM; 
        RETURN;
    END;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION categoria_negocio(
    p_nombre VARCHAR,
    p_estado BOOLEAN DEFAULT true
)
RETURNS TABLE (msj_tipo TEXT, msj_texto TEXT) AS $$
BEGIN
    -- Validar campos obligatorios
    IF TRIM(p_nombre) = '' THEN
        RETURN QUERY
        SELECT 'warning',  'Debe completar nombre';
        RETURN;
    END IF;

    BEGIN
        INSERT INTO T_Categorias (Nombre, Estado)
        VALUES (p_nombre, p_estado);

        RETURN QUERY
        SELECT 'success', 
		'Categoria insertado exitosamente.';
        RETURN;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY
        SELECT 'error', 'Error al insertar: ' || SQLERRM; 
        RETURN;
    END;
END;
$$ LANGUAGE plpgsql;

select * from categoria_negocio('Moda')
select * from T_Categorias 

DROP FUNCTION insert_negocio(character varying,text,character varying,text,integer,integer,boolean)
CREATE OR REPLACE FUNCTION insert_negocio(
    p_nombre VARCHAR,
    p_descripcion TEXT,
    p_email VARCHAR,
    p_img_url TEXT,
    p_id_admin INT,
    p_id_categoria INT,
    p_estado BOOLEAN DEFAULT true
)
RETURNS TABLE (msj_tipo TEXT, msj_texto TEXT)
AS $$
BEGIN
    -- Validar campos obligatorios
    IF TRIM(p_nombre) = '' OR TRIM(p_descripcion) = '' OR TRIM(p_email) = '' OR TRIM(p_img_url) = '' THEN
        RETURN QUERY
        SELECT 'warning',  'Debe completar nombre, descipcion, email, img_url';
        RETURN;
    END IF;

    BEGIN
        INSERT INTO T_Negocios (
			Nombre, Descripcion, Email, Img_url, Estado, id_admin, id_categoria
		)
        VALUES (
			 p_nombre, p_descripcion, p_email, p_img_url, p_estado, p_id_admin, p_id_categoria
		);

        RETURN QUERY
        SELECT 'success', 
		'Negocio insertado exitosamente.';
        RETURN;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY
        SELECT 'error', 'Error al insertar: ' || SQLERRM; 
        RETURN;
    END;
END;
$$ LANGUAGE plpgsql;
select * from t_negocios
