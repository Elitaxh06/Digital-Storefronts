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
            negociosRoutes.getNegocios,
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

export const postUploadImages = async (file: File):Promise<string | null>  => {
    try{
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await axios.post(
            negociosRoutes.postUploadImage,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        if (!data || !data.publicUrl) {
            Swal.fire({
                icon: "warning",
                title: "Atención",
                text: "No se obtuvo la URL de la imagen."
            });
            return null;
        }

        return data.publicUrl; // ✅ devuelve solo la URL

    }catch(e){
        Swal.fire({
            icon: "info",
            title: "Para su informacion",
            text: "Error al subir la imagen. Por favor, refresque la pagína o intente más tarde"
        })
        return null
    }
}

type BussinessInsertData = {
    nombre: string,
    descripcion: string,
    email: string,
    telefono: string,
    direccion: string,
    redSocial1: string,
    redSocial2: string,
    imgUrl1: string,
    imgUrl2: string,
    imgUrl3: string,
    idAdmin: number,
    idCategoria: string,
    estado: boolean
}

export const insertBussiness = async ({
    nombre,
    descripcion,
    email,
    telefono,
    direccion,
    redSocial1,
    redSocial2,
    imgUrl1,
    imgUrl2,
    imgUrl3,
    idAdmin: idAdmin,
    idCategoria,
    estado
}: BussinessInsertData): Promise<ApiResponseBusiness | null> => {
    const telefonoParseado = Number(telefono)
    const idCategoriaParseado = Number(idCategoria)
        console.log({
      nombre,
      descripcion,
      email,
      telefono,
      direccion,
      redSocial1,
      redSocial2,
      p_img_url_1: imgUrl1,
      p_img_url_2: imgUrl2,
      p_img_url_3: imgUrl3,
      idAdmin,
      idCategoria,
      estado: true
    });
    try{
        const { data } = await axios.post<ApiResponseBusiness | null>(
            negociosRoutes.insertNegocio,
            {
                p_nombre: nombre,
                p_descripcion: descripcion,
                p_email: email,
                p_telefono: telefonoParseado,
                p_direccion: direccion,
                p_red_social_1: redSocial1,
                p_red_social_2: redSocial2,
                p_img_url_1: imgUrl1,
                p_img_url_2: imgUrl2,
                p_img_url_3: imgUrl3,
                p_id_admin: idAdmin,
                p_id_categoria: idCategoriaParseado,
                p_estado: estado
            },
        )
        if(!data) return null
        if(data.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Para su informacion",
                text: "El negocio ha sido insertado exitosamente"
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
            icon: "info",
            title: "Para su informacion",
            text: "Error al insertar el negocio. Por favor, refresque la pagína o intente más tarde"
        })
        return null
    }
}

export const getNegociosByIdAdmin = async (idAdmin: number): Promise<ApiResponseBusiness | null> => {
    try{
        const { data } = await axios.get<ApiResponseBusiness | null>(
            negociosRoutes.getNegociosByIdAdmin + idAdmin,
            {
                headers: {
                    "Content-Type": "application/json"
                }
                
            }
        )
        if(!data) return null
         if(data.resultadoTipo === 'success'){
            return data
        }else if(data.resultadoTipo === 'warning'){
            Swal.fire({
                icon: "info",
                title: "Para su informacion",
                text: "No se encontraron datos de negocios asociados a su cuenta. Por favor, refresque la pagína o intente más tarde"
            })
            return data
            // return data
        }else if(data.resultadoTipo === 'error'){
            Swal.fire({
                icon: "info",
                title: "Para su informacion",
                text: "Error al obtener los datos de los negocios por ID de administrador. Por favor, refresque la pagína o intente más tarde"
                // text: data.respuestaMensaje
            })
            return data
        }
        return null
    }catch(e){
        Swal.fire({
            icon: "info",
            title: "Para su informacion",
            text: "Error al obtener los datos de los negocios por ID de administrador. Por favor, refresque la pagína o intente más tarde"
        })
        return null
    }
}

export const updateLogicalBusiness = async ({id, estado}: {id: number, estado: boolean}): Promise<ApiResponseBusiness | null> => {
    try{
        const { data } = await axios.post<ApiResponseBusiness | null>(
            negociosRoutes.updateLogical,
            {
                id,
                estado,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        // debugger
        if(!data) return null
        if(data.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Para su informacion",
                text: "El negocio ha sido actualizado exitosamente"
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
        return data
    }catch(e){
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al actualizar el estado del negocio. Por favor, refresque la pagína o intente más tarde"
        })
        return null
    }
}

type UpdateTotalBusinessParams = {
    p_negocioid: number;
    p_nombre: string;
    p_descripcion: string;
    p_email: string;
    p_telefono: string;
    p_direccion: string;
    p_red_social_1: string;
    p_red_social_2: string;
    p_img_url_1: string;
    p_id_admin: number;
    p_id_categoria: string;
    p_img_url_2?: string | null;
    p_img_url_3?: string | null;
    p_estado?: boolean;
}



export const updateTotalBusiness = async (params: UpdateTotalBusinessParams): Promise<ApiResponseBusiness | null | undefined> => {
    try{
        const telefonoParseado = Number(params.p_telefono)
        const idCategoriaParseado = Number(params.p_id_categoria)
        const { data } = await axios.put<ApiResponseBusiness | null>(
            negociosRoutes.updateTotalBusiness + params.p_negocioid,
            {   
                p_negocioid: params.p_negocioid,
                p_nombre: params.p_nombre,
                p_descripcion: params.p_descripcion,
                p_email: params.p_email,
                p_telefono: telefonoParseado,
                p_direccion: params.p_direccion,
                p_red_social_1: params.p_red_social_1,
                p_red_social_2: params.p_red_social_2,
                p_img_url_1: params.p_img_url_1,
                p_id_admin: params.p_id_admin,
                p_id_categoria: idCategoriaParseado,
                p_img_url_2: params.p_img_url_2,
                p_img_url_3: params.p_img_url_3,
                p_estado: params.p_estado
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        // debugger
        if(!data) return null
        if(data.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Para su informacion",
                text: "El negocio ha sido actualizado exitosamente"
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
        return data
    }catch(e){
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al actualizar el estado del negocio. Por favor, refresque la pagína o intente más tarde"
        })
        return null
    }
}

export const getBusinessById = async (id: number): Promise<ApiResponseBusiness | null> => {
    try{
        const { data } = await axios.get<ApiResponseBusiness | null>(
            negociosRoutes.getNegocioById + id,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if(!data) return null
        if(data.resultadoTipo === 'success'){
            return data
        }else if(data.resultadoTipo === 'warning'){
            Swal.fire({
                icon: "info",
                title: "Para su informacion",
                text: "No se encontraron datos de negocios asociados a su cuenta. Por favor, refresque la pagína o intente más tarde"
            })
            return data
            // return data
        }else if(data.resultadoTipo === 'error'){
            Swal.fire({
                icon: "info",
                title: "Para su informacion",
                text: "Error al obtener los datos de los negocios por ID de administrador. Por favor, refresque la pagína o intente más tarde"
                // text: data.respuestaMensaje
            })
            return data
        }
        return data
    }catch(e){
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al obtener los datos de los negocios. Por favor, refresque la pagína o intente más tarde"
        })
        return null
    }
}