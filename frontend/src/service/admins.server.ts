import { adminsRoutes } from "../ambientes/admins.routes";
import axios from "axios";
import Swal from "sweetalert2";

import type { Admin, ApiResponseAdmins } from "../types";

export const getAdmins = async (): Promise<ApiResponseAdmins | null> => {

    try{
        const { data } = await axios.get<ApiResponseAdmins | null>(
            adminsRoutes.getAdminsLocal ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if(!data) return null

        if(data.resultadoTipo === 'success'){
            if(Array.isArray(data.datos)) {
                const listaAdmins = data.datos.map((admin: Admin) => ({
                    ...admin,
                    estado : admin.estado === true ? 'Activo' : 'Inactivo'
                    
                }))
                const adminList = listaAdmins.reduce((acc: { activos: Admin[], inactivos: Admin[] }, admin: Admin) => {
                    if (admin.estado === 'Activo') {
                        acc.activos.push(admin)
                    } else {
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
            } else{
                return {
                    ...data,
                    datos: {
                        activos: [],
                        inactivos: []
                    }
                }
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