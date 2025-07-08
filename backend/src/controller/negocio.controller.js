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
        }else if(msj_tipo === 'warning') {
            return res.json(mensajeCompletoWarningError)
        }else if(msj_tipo === 'error') {
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result[0])

    }catch(e) {
        res.status(500).send(json({ mensaje: e }))
    }
}