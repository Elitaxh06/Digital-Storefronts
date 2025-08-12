
let Ambiente = '';
// Ambiente = 'Local'
Ambiente = 'Production'

let ruta_apis_admins = ''
let ruta_apis_business = ''

switch(Ambiente){
    case 'Local':
        ruta_apis_admins = 'http://localhost:3000/'
        ruta_apis_business = 'http://localhost:3000/'
        break;
    case 'Production':
        ruta_apis_admins = 'https://digital-storefronts.onrender.com/'
        ruta_apis_business = 'https://digital-storefronts.onrender.com/'
        break;
    default:
        ruta_apis_admins = 'http://localhost:3000/'
        ruta_apis_business = 'http://localhost:3000/'
        break;
}


export const adminsRoutes: any = {
    // LOCAL
    getAdmins: ruta_apis_admins + import.meta.env.VITE_ADMINS_GET_URL,

    insertAdmin: ruta_apis_admins + import.meta.env.VITE_API_ADMINS_INSERT_URL,

    getAdminsById: ruta_apis_admins + import.meta.env.VITE_API_ADMINS_GET_WITH_ID_URL,

    getAdminsByIdUid: ruta_apis_admins + import.meta.env.VITE_API_ADMINS_POR_ID_URL,

}

export const negociosRoutes: any = {
    // LOCAL

    getNegocios: ruta_apis_business + import.meta.env.VITE_BUSSINES_GET_URL,
    insertNegocio: ruta_apis_business + import.meta.env.VITE_BUSSINESS_INSERT_URL

}

// 
// RUTAS PARA TRABAJAR EN LOCAL
