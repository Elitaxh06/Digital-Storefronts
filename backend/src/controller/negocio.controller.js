import { json } from "stream/consumers";
import { getConnection, negocioQuerys } from "../models/index.js";

const mensaje = 'Este endpoint devuelve '
export const listarNegocios = async(req, res) => {
    try{
        const pool = await getConnection()
        const dbrows = await pool.query(negocioQuerys.listarNegocios)
        const result = dbrows.rows

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
        res.status(500).send(json({ mensaje: e }))
    }
}

export const insertNegocio = async(req, res) => {
    try{
        const { Nombre, Descripcion, Email, Img_url, id_admin, id_categoria, Estado } = req.body
        const pool = await getConnection()

        const dbrows = await pool.query(negocioQuerys.insertNegocio, [Nombre, Descripcion, Email, Img_url, id_admin, id_categoria, Estado])
        const result = dbrows.rows
        pool.release()

       
        // CONSTANTES QUE SE REPITEN EN LAS CONDICIONALES
        const { msj_texto, msj_tipo } = result[0]
        const respuesta = result[0]
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