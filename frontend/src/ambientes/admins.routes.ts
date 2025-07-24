// type Ambientes = "Local" | "Produccion";

// let ambienteActual: Ambientes = "Local";
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

    // PRODUCCION
    getAdminsProd: import.meta.env.VITE_API_ADMINS_PRODUCCION_GET_URL
}

export const negociosRoutes: any = {
    // LOCAL
    getNegociosLocal: import.meta.env.VITE_API_NEGOCIOS_LOCAL_GET_URL,

    // PRODUCCION
    getNegociosProd : import.meta.env.VITE_API_NEGOCIOS_PRODUCCION_GET_URL


}

// 
// RUTAS PARA TRABAJAR EN LOCAL
