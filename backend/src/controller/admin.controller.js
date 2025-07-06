import {getConnection, querys } from "../models/index.js"

const mensaje = 'Este endpoint devuelve '
export const listarAdmins = async(req, res) => {
    try{
        const pool = await getConnection()
        const dbrows = await pool.query(querys.listarAdmins)
        const result = dbrows.rows
        pool.release()

        // CONSTANTES QUE SE REPITEN EN LAS CONIDCIONALES
        const { msj_texto, msj_tipo } = result[0]
        const respuesta = result[0]
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "respuestaMensaje" : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + 'la lista de admins'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "respuestaMensaje" : msj_texto,
            "datos" : "",
            "mensaje" : mensaje + 'la lista de admins'
        }

        // DEVOLVER UNA RESPUESTA MAS ELABORADA PARA EL FRONTEND
        if(msj_tipo === 'success') {
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning') {
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'error') {
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result[0])
    }catch(e) {
        console.log('Hubo un error en la consulta', e)
        return res.status(500).send(e)
    }
}