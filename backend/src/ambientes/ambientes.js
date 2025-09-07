import dotenv from "dotenv"

dotenv.config()

let Ambiente = ''
Ambiente = 'Local'
// Ambiente = 'Production'

let ruta_enpoints_admins = ''
let ruta_enpoints_business = ''

switch(Ambiente){
    case 'Local':
        ruta_enpoints_admins = 'https://nkjrmlgvqcnrknnvufap.supabase.co/rest/v1/rpc/'
        ruta_enpoints_business = 'https://nkjrmlgvqcnrknnvufap.supabase.co/rest/v1/rpc/'
        break;
    case 'Production':
        ruta_enpoints_admins = 'https://nkjrmlgvqcnrknnvufap.supabase.co/rest/v1/rpc/'
        ruta_enpoints_business = 'https://nkjrmlgvqcnrknnvufap.supabase.co/rest/v1/rpc/'
        break;
    default:
        ruta_enpoints_admins = 'https://nkjrmlgvqcnrknnvufap.supabase.co/rest/v1/rpc/'
        ruta_enpoints_business = 'https://nkjrmlgvqcnrknnvufap.supabase.co/rest/v1/rpc/'
        break;
}

export const endpointsAdmins = {
    getAdmins: ruta_enpoints_admins + process.env.URL_GET_ADMINS,

    insertAdmin: ruta_enpoints_admins + process.env.URL_INSERT_ADMINS,
    
    getAdminsById: ruta_enpoints_admins + process.env.URL_GET_ADMINS_WITH_ID,
    
    getAdminsByIdUid: ruta_enpoints_admins + process.env.URL_OBTENER_ADMIN_ID_POR_UID
}

export const endpointsBusiness = {
    getNegocios: ruta_enpoints_business + process.env.URL_GET_NEGOCIOS,
    
    insertNegocio: ruta_enpoints_business + process.env.URL_INSERT_NEGOCIO,

    getNegociosByIdAdmin: ruta_enpoints_business + process.env.URL_GET_NEGOCIOS_BY_ID_ADMIN,

    updateLogical: ruta_enpoints_business + process.env.URL_UPDATE_LOGICAL,


}
