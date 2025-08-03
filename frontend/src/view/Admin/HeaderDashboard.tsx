import { useNavigate } from 'react-router-dom';
import supabase  from "../../Lib/SupabaseClient"
import type { Admin } from '../../types';
import FormAddBussiness from './FormAddBussiness';

type Props = {
    admin: Admin
}

export default function HeaderDashboard({admin}: Props) {
    const navigate = useNavigate()
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if(error) throw error
        navigate("/login")
    }

    const fechaISO = admin.fecha_registro
    const fecha = new Date(fechaISO)
    const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`
  return (
    <header>
        <div className="flex items-center justify-between p-4 bg-blue-400 text-white">
            <h1 className="text-xl font-bold">Dashboard</h1>
            {admin ? (
            <div className="flex items-center space-x-4 flex-col">
                <div className='flex flex-col items-center'>
                    <h2>{admin.nombre} {admin.apellidos}</h2>
                    <p>Se registro el {fechaFormateada}</p>
                    <span>Propietario</span>
                </div>
                <button className='ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-10 px-4 py-2 text-white hover:bg-white/20 bg-white/20 cursor-pointer hover:text-black' onClick={signOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                    Cerrar Sesión</button>
            </div>
            ) :  (
            <div className="flex items-center space-x-4 flex-col">
                {/* ************* PARA PRUEBAS CON EL API APAGADA *************** */}
                <div className='flex flex-col items-center'>
                    <h2>Esteban Pizarro</h2>
                    <span>Propietario</span>
                </div>
                <button className='ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-10 px-4 py-2 text-white hover:bg-white/20 bg-white/20 cursor-pointer hover:text-black' onClick={signOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                    Cerrar Sesión</button>
                <FormAddBussiness />
                    
            </div>
            )}
        </div>
    </header>
  );
}