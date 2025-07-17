import type { Admin, ListAdmins } from "../types"
import type { Business, ListBusiness } from "../types"
export function esAdmin(datos: Admin[] | "" | ListAdmins | undefined): datos is ListAdmins{
    return typeof datos === 'object' && datos !== null && 'activos' in datos && 'inactivos' in datos
}

export function esNegocio(datos: Business[] | "" | ListBusiness | undefined): datos is ListBusiness{
    return typeof datos === 'object' && datos !== null && 'activos' in datos && 'inactivos' in datos
}