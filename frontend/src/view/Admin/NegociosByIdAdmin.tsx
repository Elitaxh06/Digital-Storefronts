import {useState, useEffect} from 'react'
import { getNegociosByIdAdmin, updateLogicalBusiness } from '../../service/negocios.server'
import type { ApiResponseBusiness } from '../../types'
import type { Business } from '../../types'
import { esNegocio } from '../../utils/typeGurdsRead'
import Loader2 from '../../components/Loaders/Loader2'
import { EditBusiness } from './EditBusiness/EditBusiness'
import { getBusinessById } from '../../service/negocios.server'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNegocio } from '../../store'
export default function NegoiosByIdAdmin({id_admin}: {id_admin: number}) {

    const [negocios, setNegocios] = useState<ApiResponseBusiness | null>(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    

    const inactivarNegocio = async (id:number) => {
         Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción se puede revertir",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Desactivar Negocio"
        }).then((result) => {
          if (result.isConfirmed) {
            accionInactivar(id)
          }
        });
    }
    const accionInactivar = async (id:number) => {
        const result = await updateLogicalBusiness({id, estado: false})
        if(result){
            obtenerNegociosPorIdAdmin(id_admin)
        }
    }

    const activarNegocio = async (id:number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción se puede revertir",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Activar Negocio"
        }).then((result) => {
          if (result.isConfirmed) {
            accionActivar(id)
          }
        })
    }

    const accionActivar = async (id:number) => {
        const result = await updateLogicalBusiness({id, estado: true})
        if(result){
            obtenerNegociosPorIdAdmin(id_admin)
        }
    }



    const editarNegocio = async (id:number) => {
        const result = await getBusinessById(id)
        if(result){
            dispatch(setNegocio(result))
            navigate('/editarNegocio')
        }
    }

    const obtenerNegociosPorIdAdmin = async (id_admin: number) => {
        try{
            const data = await getNegociosByIdAdmin(id_admin)
            setNegocios(data)
            setLoading(false)
        }catch(e){
            console.log('Error al obtener los datos', e)
        }
        finally{
            setLoading(false)
        }       
    }
    useEffect(() => {
        obtenerNegociosPorIdAdmin(id_admin)
    }, [])    
        // const fechaISO = admin.fecha_registro
    // const fecha = new Date(fechaISO)
    // const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`  

    if(loading) return <div className='my-5'><Loader2 /></div>
    
  return (
    <section className='border-b-3'>
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Mis Negocios</h1>
            <div className="flex justify-around flex-direction-column flex-wrap items-center gap-5 my-4 w-full">
    
                {negocios?.datos && esNegocio(negocios.datos) ? (
                    <>
                        {negocios.datos.activos.map((negocio: Business) => (
                            <div key={negocio.negocioid ?? negocio.id} className="flex flex-col justify-center gap-6 bg-slate-100 w-full max-w-md p-4">
                                <div className='bg-blue-500 w-full flex justify-between items-center gap-4 flex-wrap'>
                                    <div className='flex items-center gap-2'>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-4 h-4 mr-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg></span>
                                        <div className='flex flex-col text-white'>

                                        <h3 className='text-xl font-bold'>{negocio.nombre}</h3>
                                        <p>{negocio.nombre_categoria} categoria</p>
                                        </div>
                                        
                                    </div>
                                    <span className='bg-white p-3 rounded-xl text-blue-500'>Activo</span>
                                </div>
                                <div>
                                    <div>

                                        <span className='flex items-center gap-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 text-gray-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            {negocio.direccion}
                                        </span>
                        
                                        <span className='flex items-center gap-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-4 h-4 text-gray-500"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                            {negocio.email}
                                        </span>

                                        <span className='flex items-center gap-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-4 h-4 text-gray-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            {negocio.telefono}
                                        </span>

                                    
                                    </div>
                                    <p className='border-t-2'>{negocio.descripcion}</p>

                                </div>
                            
                                <div className='flex items-center gap-2'>
                                    {/* <p>Registrado en : 2025</p> */}
                                    <button
                                        onClick={() => {
                                            const negocioId = negocio.negocioid ?? negocio.id;
                                            if (negocioId) editarNegocio(negocioId);
                                        }}
                                        className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer font-semibold'
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 cursor-pointer font-semibold'
                                        onClick={() => {
                                            const negocioId = negocio.negocioid ?? negocio.id;
                                            if (negocioId) inactivarNegocio(negocioId);
                                        }}
                                    >Inactivar</button>
                                </div>
                            </div>
                        ))}
                        {negocios.datos.inactivos.map((negocio: Business) => (
                            <div key={negocio.negocioid ?? negocio.id} className="flex flex-col justify-center gap-6 bg-slate-100 w-full max-w-md p-4">
                                <div className='bg-blue-500 w-full flex justify-between items-center gap-4 flex-wrap'>
                                    <div className='flex items-center gap-2'>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-4 h-4 mr-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg></span>
                                        <div className='flex flex-col text-white'>

                                        <h3 className='text-xl font-bold'>{negocio.nombre}</h3>
                                        <p>{negocio.nombre_categoria} categoria</p>
                                        </div>
                                        
                                    </div>
                                    <span className='bg-white p-3 rounded-xl text-blue-500'>Inactivo</span>
                                </div>
                                    <div>
                                    <div>

                                        <span className='flex items-center gap-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 text-gray-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            {negocio.direccion}
                                        </span>
                        
                                        <span className='flex items-center gap-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-4 h-4 text-gray-500"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                            {negocio.email}
                                        </span>

                                        <span className='flex items-center gap-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-4 h-4 text-gray-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            {negocio.telefono}
                                        </span>

                                    
                                    </div>
                                    <p className='border-t-2'>{negocio.descripcion}</p>

                                </div>
                            
                                <div className='flex items-center gap-2'>
                                    {/* <p>Registrado en : 2025</p> */}
                                    <button
                                        className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer font-semibold'
                                        onClick={() => {
                                            const negocioId = negocio.negocioid ?? negocio.id;
                                            if (negocioId) editarNegocio(negocioId);
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='bg-green-500 text-white p-2 rounded-lg hover:bg-green-c cursor-pointer font-semibold'
                                        onClick={() => {
                                            const negocioId = negocio.negocioid ?? negocio.id;
                                            if (negocioId) activarNegocio(negocioId);
                                        }}
                                    >Activar</button>   
                                </div>
                                <EditBusiness />
                            </div>
                        ))}
                    </>
                ):(
                    <span>No hay negocios registrados</span>
                
                ) }
            </div>
        </div>
    </section>
  )
}
