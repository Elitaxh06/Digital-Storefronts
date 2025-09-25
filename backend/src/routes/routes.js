import { Router } from "express";
import multer from "multer";
import { 
    listarAdmins,
    insertartAdmins,
    listarAdminsById,
    obtenerAdminIdPorUid
 } from "../controller/admin.controller.js";

import {
    listarNegocios,
    insertNegocio,
    listarNegociosByIdAdmin,
    desactivarActivarNegocio,
    updateTotalBusiness,
    getBusinessById,
    subirImagenes
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
routes.get("/listarNegocioByIdAdmin/:id", listarNegociosByIdAdmin)
routes.post("/updateLogical", desactivarActivarNegocio)
routes.put("/updateTotalBusiness/:id", updateTotalBusiness)
routes.get("/listarNegocioById/:id", getBusinessById)

const upload = multer( { storage: multer.memoryStorage() })
routes.post("/uploadImage",upload.single("file"), subirImagenes)

export default routes