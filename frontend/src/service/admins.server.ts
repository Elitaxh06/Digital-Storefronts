import { adminsRoutes } from "../ambientes/admins.routes";
import axios from "axios";
import Swal from "sweetalert2";

import type { Admin, ApiResponseAdmins } from "../types";

type AdminInsertData = {
    nombre: string;
    apellidos: string;
    email:string;
    telefono: string;
    estado: boolean | string;
    id_usuario_supabase?: string; // Optional, if you want to include the Supabase user ID
}



export const getAdmins = async (): Promise<ApiResponseAdmins | null> => {

    try{
        const { data } = await axios.get<ApiResponseAdmins | null>(
            adminsRoutes.getAdmins,
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


export const insertAdmin = async ({
    nombre,
    apellidos,
    email,
    telefono,
    estado,
    id_usuario_supabase: userId 
}: AdminInsertData): Promise<ApiResponseAdmins | null> => {
    const telefonoParseado = Number(telefono);
    try{
        const { data } = await axios.post<ApiResponseAdmins | null>(
            adminsRoutes.insertAdmin,
            {
                p_nombre: nombre,
                p_apellidos: apellidos,
                p_email: email,
                p_telefono: telefonoParseado,
                p_estado: estado,
                p_id_usuario_supabase: userId
            }
        )
        // debugger
        if(data?.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Administrador registrado",
                text: data.respuestaMensaje
            })
            return data
        }else if(data?.resultadoTipo === 'warning'){
            Swal.fire({
                icon: "warning",
                title: "Para su informacion",
                text: data.respuestaMensaje
            })
            return data
        }else if(data?.resultadoTipo === 'error'){
            Swal.fire({
                icon: "error",
                title: "Para su informacion",
                text: data.respuestaMensaje
            })
            return data
        }
        return null
        
    }catch (e: unknown) {
        if (e instanceof Error) {
          Swal.fire({
            icon: "warning",
            title: "Para su información",
            text: "Error al insertar el administrador: " + e.message,
          });
          console.error("Error al insertar el administradorfsdfsfsdf", e);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Error desconocido",
            text: "Ocurrió un error inesperado",
          });
          console.error("Error no identificado", e);
        }
        return null;
    }
}


export const getAdminsById = async (id_admin: number): Promise<ApiResponseAdmins | null> => {
    try{
        const { data } = await axios.get<ApiResponseAdmins | null>(
            adminsRoutes.getAdminsById + id_admin,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if(!data) return null

        if(data.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Bienvenido",
                text: "Acceso al panel de administrador"
            })
            return data
        }else if(data.resultadoTipo === 'warning'){
            Swal.fire({ 
                icon: "warning",
                title: "Para su informacion",
                text: data.respuestaMensaje
            })
            return data
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
            text: "Error al obtener los datos del administrador"
        })
        console.log('Error al obtener los datos del administrador', e)
        return null
    }
}


export const getAdminsByUid = async (uid: string): Promise<ApiResponseAdmins | null> => {
    try{
        const { data } = await axios.get<ApiResponseAdmins | null>(
            adminsRoutes.getAdminsByIdUid + uid,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        if(data?.resultadoTipo === 'success'){
            
            return data
        }else if(data?.resultadoTipo === 'warning'){
            Swal.fire({
                icon: "warning",
                title: "Para su informacion",
                text: 'No se encontró un administrador asociado a su cuenta, Por favor, verifica tu cuenta o contacta al soporte.'
            })
            return data
        }else if(data?.resultadoTipo === 'error'){
            Swal.fire({
                icon: "error",
                title: "Para su informacion",
                text: data.respuestaMensaje
            })
            return data
        }
        return data || null
    }catch(e){
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al obtener los datos del administrador por UID"
        })
        console.log('Error al obtener los datos del administrador por UID', e)
        return null
    }
}