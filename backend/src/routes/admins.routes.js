import { Router } from "express";
import { 
    listarAdmins
    
 } from "../controller/admin.controller.js";
const routes = Router()

routes.get("/listar", listarAdmins)

export default routes