import { Router } from "express";
import { 
    listarAdmins
    
 } from "../controller/admin.controller.js";

import {
    listarNegocios
} from "../controller/negocio.controller.js"
const routes = Router()

// ************************************************************************
// RUTAS PARA ADMINS
routes.get("/listarAdmins", listarAdmins)


// ************************************************************************
// RUTAS PARA NEGOCIOS
routes.get("/listarNegocios", listarNegocios)

export default routes