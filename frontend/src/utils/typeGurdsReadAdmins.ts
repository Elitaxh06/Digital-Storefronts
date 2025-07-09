import type { Admin, AdminListado } from "../types"
import type { Negocios, NegocioListado } from "../types"
export function esAdmin(datos: Admin[] | "" | AdminListado | undefined): datos is AdminListado{
    return typeof datos === 'object' && datos !== null && 'activos' in datos && 'inactivos' in datos
}

export function esNegocio(datos: Negocios[] | "" | NegocioListado | undefined): datos is NegocioListado{
    return typeof datos === 'object' && datos !== null && 'activos' in datos && 'inactivos' in datos
}