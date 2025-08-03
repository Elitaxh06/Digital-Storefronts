
export const adminsRoutes: any = {
    // LOCAL
    getAdminsLocal : import.meta.env.VITE_API_ADMINS_LOCAL_GET_URL,

    getAdminsByIdLocal: import.meta.env.VITE_API_ADMINS_LOCAL_GET_WITH_ID_URL,

    getAdminsByUidLocal: import.meta.env.VITE_API_ADMINS_POR_ID_URL,
    
    insertAdminsLocal: import.meta.env.VITE_API_ADMINS_LOCAL_INSERT_URL,


    // PRODUCCION
    getAdminsProd: import.meta.env.VITE_ADMINS_PROD_URL,

    getAdminsByIdProd: import.meta.env.VITE_API_ADMINS_PROD_GET_WITH_ID_URL,

    getAdminsByUidProd: import.meta.env.VITE_API_ADMINS_POR_ID_URL_PROD,

    insertAdmisProd: import.meta.env.VITE_API_ADMINS_PROD_INSERT_URL

}

export const negociosRoutes: any = {
    // LOCAL
    getNegociosLocal: import.meta.env.VITE_BUSSINES_LOCAL_URL,

    // PRODUCCION
    getNegociosProd : import.meta.env.VITE_BUSSINESS_PROD_URL


}

// 
// RUTAS PARA TRABAJAR EN LOCAL
