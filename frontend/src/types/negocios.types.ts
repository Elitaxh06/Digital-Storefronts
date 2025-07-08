export type NegocioListado = {
    activos: Negocios[],
    inactivos: Negocios[]
}
export type Negocios = {
    id: number,
    descripcion: string,
    email: string,
    img_url: string,
    estado: boolean | string,
    id_admin: number,
    nombre_categoria: string,
    nombre: string,
    msj_tipo: string,
    msj_texto: string,
}   

export type RespuestaApiNegocios = {
    resultadoTipo : string,
    respuestaMensaje: string,
    datos: (Negocios | null) | Negocios[] | "" | NegocioListado,
    mensaje: string
}