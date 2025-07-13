export type NegocioListado = {
    activos: Negocios[],
    inactivos: Negocios[]
}
export type Negocios = {
    id: number;
    nombre: string;
    descripcion: string;
    email: string;
    direccion: string;
    red_social_1: string;
    red_social_2: string;
    img_url_1: string;
    img_url_2?: string | null;
    img_url_3?: string | null;
    estado: boolean | string | null;
    id_admin: number;
    nombre_admin: string;
    nombre_categoria: string;
    msj_tipo: string;
    msj_texto: string;
}   

export type RespuestaApiNegocios = {
    resultadoTipo : string,
    respuestaMensaje: string,
    datos:  Negocios[] | "" | NegocioListado,
    mensaje: string
}