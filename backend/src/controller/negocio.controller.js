import axios from "axios" 
import dotenv from "dotenv"
import { endpointsBusiness } from "../ambientes/ambientes.js"

// import { getConnection, negocioQuerys } from "../models/index.js";

dotenv.config()
const mensaje = 'Este endpoint devuelve '
export const listarNegocios = async(req, res) => {
    try{
       const { data } = await axios.post(
            endpointsBusiness.getNegocios,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : process.env.API_KEY_SERVICE_ROLE,
                    "Authorization" : `Bearer ${process.env.AUTHORIZATION_SERVICE_ROLE}`
                }
            }
       )

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
            endpointsBusiness.insertNegocio,
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

export const listarNegociosByIdAdmin = async(req, res) => {
    try{    
        const { id } = req.params
        const { data } = await axios.post(
            endpointsBusiness.getNegociosByIdAdmin,
            { p_admin_id :  id },
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : process.env.API_KEY_SERVICE_ROLE,
                    "Authorization" : `Bearer ${process.env.AUTHORIZATION_SERVICE_ROLE}`
                }
            }            
        )
        const result = data
        const { msj_texto, msj_tipo } = result[0]
        const respuesta = result 

        const negociosActivos = result.filter(n => n.estado === true)
        const negociosInactivos = result.filter(n => n.estado === false)
        const respuestaListBusiness = {
            activos: negociosActivos,
            inactivos: negociosInactivos
        }
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "respuestaMensaje" : msj_texto,
            "datos" : respuestaListBusiness,
            "mensaje" : mensaje + 'la lista de negocios'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "respuestaMensaje" : msj_texto,
            "datos" :  { activos: [], inactivos: [] },
            "mensaje" : mensaje + 'la lista de negocios'
        }

        // DEVOLVER UNA RESPUESTA MAS ELABORADA PARA EL FRONTEND
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result)
    }catch(e){
        res.status(500).json({ mensaje: e })
    }
}

export const desactivarActivarNegocio = async(req, res)=> {
    try{
        const { id, estado } = req.body
        const { data } = await axios.post(
            endpointsBusiness.updateLogical,
            { p_negocio: id, p_estado: estado },
            {  
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : process.env.API_KEY_SERVICE_ROLE,
                    "Authorization" : `Bearer ${process.env.AUTHORIZATION_SERVICE_ROLE}`
                }
            }
        )
        const result = data
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
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result)
    }catch(e){
        res.status(500).json({ mensaje: e })
    }
}

export const updateTotalBusiness = async(req, res) => {
    try{
        const {
            p_negocioid,
            p_nombre,
            p_descripcion,
            p_email,
            p_telefono,
            p_direccion,
            p_red_social_1,
            p_red_social_2,
            p_img_url_1,
            p_id_admin,
            p_id_categoria,
            p_img_url_2,
            p_img_url_3,
            p_estado
        } = req.body
        const { data } = await axios.post(
            endpointsBusiness.updateLogical,
            { p_negocioid, p_nombre, p_descripcion, p_email, p_telefono, p_direccion, p_red_social_1, p_red_social_2, p_img_url_1, p_id_admin, p_id_categoria, p_img_url_2, p_img_url_3, p_estado },
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : process.env.API_KEY_SERVICE_ROLE,
                    "Authorization" : `Bearer ${process.env.AUTHORIZATION_SERVICE_ROLE}`
                }
            }
        )
        const result = data
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
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result)
        
    }catch(e){
        return res.status(500).json({ resultadoTipo: 'error', respuestaMensaje: e.message });
    }
}