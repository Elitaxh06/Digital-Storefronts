export const adminQuerys = {
    listarAdmins : 'select * from fn_listar_admins()',
    insertarAdmins: 'SELECT * FROM insertar_admin( $1, $2, $3, $4);'
}



export const negocioQuerys = {
    listarNegocios: "select * from fn_listar_negocio()",
    insertNegocio: 'select * from insert_negocio($1, $2, $3, $4, $5, $6, $7)'
}