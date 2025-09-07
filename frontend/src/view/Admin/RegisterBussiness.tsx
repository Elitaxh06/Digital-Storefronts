import type { Admin } from '../../types'
import FormAddBussiness from './FormAddBussiness'
import NegoiosByIdAdmin from './NegociosByIdAdmin'

type Modo = 'ver' | 'agregar'

type Props = {
    admin: Admin
    modo: Modo,
    setModo: React.Dispatch<React.SetStateAction<Modo>>,
}

export default function RegisterBussiness({admin, modo, setModo}: Props) {

  return (
    <section className='flex items-center justify-center'>
        <div className='w-[80%] bg-white py-4'>
            {modo === 'ver' ? (
                <>
            <div className='flex flex-col items-center justify-center'>
                <NegoiosByIdAdmin  id_admin={admin.adminid} />
                <span className='pt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"   className="lucide lucide-building2 w-16 h-16 text-gray-400 mx-auto mb-6"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2  2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></  svg>
                </span>
                <h4 className='text-xl font-semibold mb-3'>¡Bienvenido {admin.nombre}!</h4>
                <p>¡Registra tu negocio!</p>
                <button className='p-3 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer mb-3 rounded-lg mt-3' onClick={() => setModo('agregar')}>Registrar Mi Negocio</button>
            </div>
                </>
            ):(
                <FormAddBussiness admin={admin}/>
            )}

        </div>
    </section>
  )
}
