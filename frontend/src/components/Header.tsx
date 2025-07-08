// import { useState } from 'react'

function Header() {
    // const [showDevModal, setShowDevModal ] = useState<boolean>(false)
    // const handleRegisterClick = () => {
    //     setShowDevModal(true)
    // }
    // const handleContactEmail = () => {
    //     window.location.href = 'mailto:pizarroteb06@outlook.com?subject=Registro de Negocio - tiendaticaCR=Hola, me interesa registra mi negocio en tiendaticaCR. Por favor, envienme más información sobre el proceso'
    // }

  return (
    <header className='flex justify-between items-center py-4 px-12 bg-white border-b '>
        <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-globe h-8 w-8 text-orange-600"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
            <h2 className='text-lg font-bold'>TiendaticaCR</h2>
        </div>
        <nav>
            <ul className='flex gap-3'>
                <a className='hover:text-orange-500' href="#">Inicio</a>
                <a className='hover:text-orange-500' href="#">Explorar</a>
                <a className='hover:text-orange-500' href="#">Categorias</a>
                <a className='hover:text-orange-500' href="#">Contacto</a>
            </ul>
        </nav>
        <div className='flex items-center gap-2'>
            <span className='cursor-pointer hover:bg-slate-200 rounded-lg'>🔍</span>
            <button className='bg-orange-500 flex items-center justify-center text-white font-semibold rounded-md h-10 w-full p-2 cursor-pointer hover:bg-orange-600 hover:scale-105 transition-transform duration-200'>Registrar Negocio</button>
        </div>
    </header>
)
}

export { Header }