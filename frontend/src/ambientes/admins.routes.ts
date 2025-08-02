// type Ambientes = "Local" | "Produccion";

// let ambienteActual: Ambientes = "Local"; // Cambiar a "Produccion" según sea necesario
// let urlNegocios = ""

// switch(ambienteActual){
//     case "Local":
//         urlNegocios = import.meta.env.VITE_API_NEGOCIOS_LOCAL_GET_URL;
//         break;
//     case "Produccion":
//         urlNegocios = import.meta.env.VITE_API_NEGOCIOS_PRODUCCION_GET_URL;
//         break;
//     default:
//         urlNegocios = import.meta.env.VITE_API_NEGOCIOS_PRODUCCION_GET_URL;
//         break;
// }


export const adminsRoutes: any = {
    // LOCAL
    getAdminsLocal : import.meta.env.VITE_API_ADMINS_LOCAL_GET_URL,

    getAdminsByIdLocal: import.meta.env.VITE_API_ADMINS_LOCAL_GET_WITH_ID_URL,

    // PRODUCCION
    getAdminsProd: import.meta.env.VITE_ADMINS_PROD_URL,

    insertAdminsLocal: import.meta.env.VITE_API_ADMINS_LOCAL_INSERT_URL,
}

export const negociosRoutes: any = {
    // LOCAL
    getNegociosLocal: import.meta.env.VITE_BUSSINES_LOCAL_URL,

    // PRODUCCION
    getNegociosProd : import.meta.env.VITE_BUSSINESS_PROD_URL


}

// 
// RUTAS PARA TRABAJAR EN LOCAL
