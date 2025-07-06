import { adminsRoutes } from "../ambientes/admins.routes";
import axios from "axios";
import Swal from "sweetalert2";

import type { Admin, RespuestaApi } from "../types/types";

export const getAdmins = async (): Promise<RespuestaApi | null> => {

    try{
        const { data } = await axios.get<RespuestaApi | null>(
            adminsRoutes.getAdmins,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if(data.resultadoTipo === 'success'){
            let listaAdmins = data.datos
            listaAdmins = listaAdmins.map((admin: Admin) => {
                return {
                    ...admin,
                    estado : admin.estado === true ? 'Activo' : 'Inactivo'
                }
            })
            const adminList = listaAdmins.reduce((
                acc: { activos: Admin[], inactivos: Admin[]}, admin: Admin) => {
                if(admin.estado === 'Activo') {
                    acc.activos.push(admin)
                }else if(admin.estado === 'Inactivo') {
                    acc.inactivos.push(admin)
                }
                return acc
            }, {
                activos: [],
                inactivos: []
            })
            return {
                ...data,
                datos: adminList
            }
        }else if(data.resultadoTipo === 'warning'){
            Swal.fire({
                icon: "warning",
                title: "Para su informacion",
                text: data.respuestaMensaje
            })
            return data
            // return false
        }else if(data.resultadoTipo === 'error'){
            Swal.fire({
                icon: "error",
                title: "Para su informacion",
                text: data.respuestaMensaje
            })
            return data
        }
        return null
    }catch(e) {
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al obtener los datos"
        })
        console.log('Error al obtener los datos', e)
        return null
    }
}