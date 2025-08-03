import { Router } from "express";
import { 
    listarAdmins,
    insertartAdmins,
    listarAdminsById,
    obtenerAdminIdPorUid
 } from "../controller/admin.controller.js";

import {
    listarNegocios,
    insertNegocio
} from "../controller/negocio.controller.js"
const routes = Router()

// ************************************************************************
// RUTAS PARA ADMINS
routes.get("/listarAdmins", listarAdmins)
routes.post("/insertarAdmins", insertartAdmins)
routes.get("/listarAdmins/:id", listarAdminsById)

routes.get("/obtenerAdminIdPorUid/:uid", obtenerAdminIdPorUid)


// ************************************************************************
// RUTAS PARA NEGOCIOS
routes.get("/listarNegocios", listarNegocios)
routes.post("/insertarNegocio", insertNegocio)


export default routes