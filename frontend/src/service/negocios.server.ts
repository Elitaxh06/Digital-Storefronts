import axios from "axios";
import Swal from "sweetalert2";
import type{ 
    Negocios,
    RespuestaApiNegocios
} from "../types"
import { negociosRoutes } from "../ambientes/admins.routes";

export const getNegocios = async (): Promise<RespuestaApiNegocios | null> => {
    const { data } = await axios.get<RespuestaApiNegocios | null>(
        negociosRoutes.getNegociosProd,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    if(!data) return null
    try{
        if(data.resultadoTipo === 'success'){
            if(Array.isArray(data.datos)){
                const listNegocios = data.datos.map((negocio: Negocios) => {
                    return {
                        ...negocio,
                        estado : negocio.estado === true ? 'Activo' : 'Inactivo'
                    }
                })
                const negocioList = listNegocios.reduce((acc: { activos: Negocios[], inactivos: Negocios[]}, negocio: Negocios) => {
                    if(negocio.estado === 'Activo'){
                        acc.activos.push(negocio)
                    }else{
                        acc.inactivos.push(negocio)
                    }
                    return acc
                }, {
                    activos: [],
                    inactivos: []

                })
                return {
                    ...data,
                    datos: negocioList
                }
            }else {
                return{
                    ...data,
                    datos:{
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
    }catch(e){
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al obtener los datos"
        })
        return null
    }
}