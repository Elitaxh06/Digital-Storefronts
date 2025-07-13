import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const mensaje = 'Este endpoint devuelve '
export const listarAdmins = async(req, res) => {
    try{
        const { data } = await axios.post(
            process.env.URL_GET_ADMINS,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : process.env.API_KEY,
                    "Authorization" : `Bearer ${process.env.Authorization}`
                }
            }
        )
        const result = data

        // CONSTANTES QUE SE REPITEN EN LAS CONIDCIONALES
        const { msj_texto, msj_tipo } = result[0]
        const respuesta = result
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
        }else if(msj_tipo === 'warning' || msj_tipo === 'error') {
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result)
    }catch(e) {
        console.log('Hubo un error en la consulta', e)
        return res.status(500).send(e)
    }
}

export const insertartAdmins = async(req, res) => {
    try{
        const {  p_nombre, p_apellidos, p_email, p_telefono, p_estado } = req.body
        const { data } = await axios.post(
            process.env.URL_INSERT_ADMINS,
            {  p_nombre, p_apellidos, p_email, p_telefono, p_estado },
            {
                headers: {
                    "Content-Type": "application/json",
                    apikey : process.env.API_KEY,
                    Authorization : `Bearer ${process.env.Authorization}`,
                    Prefer: 'return=representation'
                }
            }
        )
        const result = data

        // CONSTANTES QUE SE REPITEN EN LAS CONIDCIONALES
        const { msj_texto, msj_tipo } = result[0]
        const respuesta = result
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
        }else if(msj_tipo === 'warning' || msj_tipo === 'error') {
            return res.json(mensajeCompletoWarningError)
        } 
        return res.json(result)
    }catch(e) {
        res.status(500).json({ mensaje: e })
    }
}