import supabase from "../../Lib/SupabaseClient"
import { useState, useEffect } from "react"
import { getAdminsById } from '../../service/admins.server'
import type { Admin } from '../../types';
import { getAdminsByUid } from '../../service/admins.server';
import RegisterAdmin from "./RegisterAdmin"
import HeaderDashboard from "./HeaderDashboard"
import Loader from "../../components/Loaders/Loader";
import RegisterBussiness from "./RegisterBussiness";

type Modo = 'ver' | 'agregar' 

function Dashboard(){
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState<Boolean>(true)
    const [modo, setModo] = useState<Modo>('ver')
  
    useEffect(() => {

      const fetchAdminByUid = async () => {
      const { data: { user }, } = await supabase.auth.getUser();
      const userId = user?.id;
      if (!userId){
        setLoading(false)
        return
      } 

      // 1. Obtener los datos del endpoint
      // reulstAdminResponse tiene toda la respuesta que devuelve el backend 
      const resultAdminResponse = await getAdminsByUid(userId)
      // sacar solo la respuesta de datos el importante es el id
      const datos = resultAdminResponse?.datos
      // si no es un array se sale
      if(!Array.isArray(datos) || datos.length === 0 ){
        setLoading(false)
        return
      }
      //extraemos el id ej:25 
      const adminId = datos[0].adminid
      if (!adminId) {
        setLoading(false)
        return
      }
      // obtemos los datos del usuario con el id que ya sacamos usando el endpoint para ver info solo de un usuario
      const data = await getAdminsById(adminId)
      
      if(!data) {
        setLoading(false)
        return
      }
      
      // Si data.datos es un array lo mas probable esque sea activos[] le pasamos ese valor a setAdmin
      if(Array.isArray(data.datos)){
          setAdmin(data.datos[0])
      }
          // faltaria hacer una validacion si los admins estan acivos[] o inactivos[] 
          setLoading(false)
      }
  

      fetchAdminByUid()   
    }, [])

    if(loading) return(<><Loader /></>)
    return(
        <section className="mt-24 bg-slate-300">
          {admin ? (
            <>
              <HeaderDashboard admin={admin} setModo={setModo} modo={modo}/>
              {/* <NegoiosByIdAdmin id_admin={admin.adminid} /> */}
              <RegisterBussiness admin={admin} modo={modo} setModo={setModo}/>
            </>
            
          ): (
            <RegisterAdmin />
          )}

        </section>
    )
}

export { Dashboard }