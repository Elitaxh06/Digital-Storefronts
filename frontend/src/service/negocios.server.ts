import axios from "axios";
import Swal from "sweetalert2";
import type{ 
    Business,
    ApiResponseBusiness
} from "../types"
import { negociosRoutes } from "../ambientes/admins.routes";

export const getNegocios = async (): Promise<ApiResponseBusiness | null> => {
    try{
        const { data } = await axios.get<ApiResponseBusiness | null>(
            // negociosRoutes.getNegociosProd,
            negociosRoutes.getNegociosLocal,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if(!data) return null
            if(data.resultadoTipo === 'success'){
                if(Array.isArray(data.datos)){
                    const listBusiness = data.datos.map((business: Business) => {
                        return {
                            ...business,
                            estado : business.estado === true ? 'Activo' : 'Inactivo'
                        }
                    })
                    const negocioList = listBusiness.reduce((acc: { activos: Business[], inactivos: Business[]}, business: Business) => {
                        if(business.estado === 'Activo'){
                            acc.activos.push(business)
                        }else{
                            acc.inactivos.push(business)
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
            icon: "info",
            title: "Para su informacion",
            text: "Error al obtener los datos de los negocios. Por favor, refresque la pagína o intente más tarde"
        })
        return null
    }
}