import axios from "axios" 
import dotenv from "dotenv"

// import { getConnection, negocioQuerys } from "../models/index.js";

dotenv.config()
const mensaje = 'Este endpoint devuelve '
export const listarNegocios = async(req, res) => {
    try{
       const { data } = await axios.post(
            process.env.URL_GET_NEGOCIOS,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : process.env.API_KEY_SERVICE_ROLE,
                    "Authorization" : `Bearer ${process.env.AUTHORIZATION_SERVICE_ROLE}`
                }
            }
       )
       console.log('Respuesta de Supabase:', data);

       const result = data

    //    return res.json(data)
        // CONSTANTES QUE SE REPITEN EN LAS CONDICIONALES
        const { msj_texto, msj_tipo } = result[0]
        const respuesta = result
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "respuestaMensaje" : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + 'la lista de negocios'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "respuestaMensaje" : msj_texto,
            "datos" : "",
            "mensaje" : mensaje + 'la lista de negocios'
        }

        // DEVOLVER UNA RESPUESTA MAS ELABORADA PARA EL FRONTEND
        if(msj_tipo === 'success') {
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning') {
            return res.json(mensajeCompletoWarningError)
        }else if(msj_tipo === 'error') {
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result)

    }catch(e) {
        console.error('Error en listarNegocios:', e);
        res.status(500).json({ mensaje: e.message || e.toString() });

    }
}

export const insertNegocio = async(req, res) => {
    try{
        const { p_nombre,p_descripcion,p_email,p_telefono,p_direccion,p_red_social_1,p_red_social_2,p_img_url_1,p_img_url_2,p_img_url_3,p_id_admin,p_id_categoria,p_estado } = req.body
        const { data } = await axios.post(
            process.env.URL_INSERT_NEGOCIO,
            { p_nombre,p_descripcion,p_email,p_telefono,p_direccion,p_red_social_1,p_red_social_2,p_img_url_1,p_img_url_2,p_img_url_3,p_id_admin,p_id_categoria,p_estado  },
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : process.env.API_KEY_SERVICE_ROLE,
                    "Authorization" : `Bearer ${process.env.AUTHORIZATION_SERVICE_ROLE}`
                }
            }
        )
        const result = data

       
        // CONSTANTES QUE SE REPITEN EN LAS CONDICIONALES
        const { msj_texto, msj_tipo } = result[0]
        const respuesta = result
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "respuestaMensaje" : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + 'la lista de negocios'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "respuestaMensaje" : msj_texto,
            "datos" : "",
            "mensaje" : mensaje + 'la lista de negocios'
        }

        // DEVOLVER UNA RESPUESTA MAS ELABORADA PARA EL FRONTEND
        if(msj_tipo === 'success') {
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error') {
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result)
    }catch(error){
              console.error('Error en insertarNegocio:', error);
          return res.status(500).json({
            resultadoTipo: 'error',
            respuestaMensaje: 'Error interno del servidor',
            datos: '',
            mensaje: 'Este endpoint registra un nuevo negocio'
          });
        }
}