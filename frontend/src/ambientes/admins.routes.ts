
let Ambiente = '';
Ambiente = 'Local'
// Ambiente = 'Production'

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
    getAdmins: ruta_apis_admins + import.meta.env.VITE_ADMINS_GET_URL,

    insertAdmin: ruta_apis_admins + import.meta.env.VITE_API_ADMINS_INSERT_URL,

    getAdminsById: ruta_apis_admins + import.meta.env.VITE_API_ADMINS_GET_WITH_ID_URL,

    getAdminsByIdUid: ruta_apis_admins + import.meta.env.VITE_API_ADMINS_POR_ID_URL,
}

export const negociosRoutes: any = {
    getNegocios: ruta_apis_business + import.meta.env.VITE_BUSSINES_GET_URL,
    insertNegocio: ruta_apis_business + import.meta.env.VITE_BUSSINESS_INSERT_URL,
    getNegociosByIdAdmin: ruta_apis_business + import.meta.env.VITE_BUSSINESS_GET_WITH_ID_ADMIN_URL,
    updateLogical: ruta_apis_business + import.meta.env.VITE_BUSINESS_UPDATE_LOGICAL_URL,
    updateTotalBusiness: ruta_apis_business + import.meta.env.VITE_BUSINESS_UPDATE_TOTAL_URL,
    getNegocioById: ruta_apis_business + import.meta.env.VITE_BUSINESS_GET_BY_ID_URL,
}

