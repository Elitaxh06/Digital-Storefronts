import { useNavigate } from 'react-router-dom';
import supabase  from "../../Lib/SupabaseClient"
import type { Admin } from '../../types';
import type React from 'react';

type Modo = 'ver' | 'agregar' 

type Props = {
    admin: Admin,
    setModo: React.Dispatch<React.SetStateAction<Modo>>,
    modo: Modo
}

export default function HeaderDashboard({admin, setModo, modo}: Props) {
    const navigate = useNavigate()
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if(error) throw error
        navigate("/")
    }

    // const fechaISO = admin.fecha_registro
    // const fecha = new Date(fechaISO)
    // const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`
  return (
    <header className='w-full'>
        <div className="flex items-center justify-between p-4 bg-blue-400 text-white flex-wrap">
            {admin ? (
            <>
                <div className='flex gap-6 items-center'>
                    
                    <button className='flex items-center p-2 border-2 rounded-md cursor-pointer bg-white/20 hover:bg-white/40 hover:text-black' onClick={() => setModo('ver')} disabled={modo==='ver'}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-4 h-4 mr-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg></span>
                        Mis negocios</button>
                    <button className='flex items-center p-2 border-2 rounded-md cursor-pointer bg-white/20 hover:bg-white/40 hover:text-black' onClick={() => setModo("agregar")} disabled={modo === 'agregar'}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home w-4 h-4 mr-2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        </span>
                        Registrar Nuevo
                    </button>
                </div>
                <div className="flex items-center space-x-4 ">
                    <div className='flex flex-col items-center'>
                        <h2 className='font-bold text-lg'>{admin.nombre} {admin.apellidos}</h2>
                        <span>Propietario</span>
                    </div>
                    <button className='ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm   font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]   :size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-10 px-4 py-2 text-white hover:bg-red-500 bg-red-400 cursor-pointer' onClick={signOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"  strokeLinejoin="round" className="lucide lucide-log-out w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></ polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                        Cerrar Sesión</button>
                </div>

            </>
            ) :  (
                <h2>No hay usuario registrado</h2>
            )}
        </div>
    </header>
  );
}