export type AdminListado = {
  activos: Admin[],
  inactivos: Admin[]
}

export type Admin = {
    id : number,
    nombre: string,
    email : string,
    fecha_registro : string,
    estado : boolean | string,
    apellidos : string,
    msj_tipo : string,
    msj_texto : string,
}
export type RespuestaApi  = {
  resultadoTipo : string,
  respuestaMensaje: string,
  mensaje : string,
  datos: Admin[] |"" | AdminListado
}