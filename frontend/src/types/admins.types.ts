export type ListAdmins = {
  activos: Admin[],
  inactivos: Admin[]
}

export type Admin = {
    id : number,
    nombre: string,
    email : string,
    fecha_registro : string,
    estado : boolean | string,
    id_usuario_supabase: string,
    apellidos : string,
    msj_tipo : string,
    msj_texto : string,
}
export type ApiResponseAdmins  = {
  resultadoTipo : string,
  respuestaMensaje: string,
  mensaje : string,
  datos: Admin[] |"" | ListAdmins
}