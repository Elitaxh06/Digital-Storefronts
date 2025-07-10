import { useState } from 'react'
function Header() {
    const [ isMobilOpen, setIsMobilOpen ] = useState<boolean>(false)
    const [showDevModal, setShowDevModal ] = useState<boolean>(false)
    const handleRegisterClick = () => {
        setShowDevModal(true)
    }
    const handleContactEmail = () => {
        window.location.href = 'mailto:pizarroteb06@outlook.com?subject=Registro de Negocio - tiendaticaCR=Hola, me interesa registra mi negocio en tiendaticaCR. Por favor, envienme más información sobre el proceso'
    }

  return (
    <header className='flex justify-between items-center py-4 px-12 bg-white fixed border-b border-slate-200 top-0 left-0 right-0 z-40'>
        <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-8 w-8 text-orange-600"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
            <h2 className='text-lg font-bold'>TiendaticaCR</h2>
        </div>
        <nav>
            <ul className='hidden md:flex space-x-6 gap-3'>
                <a className='hover:text-orange-500' href="#">Inicio</a>
                <a className='hover:text-orange-500' href="#">Explorar</a>
                <a className='hover:text-orange-500' href="#">Categorias</a>
                <a className='hover:text-orange-500' href="#">Contacto</a>
            </ul>
        </nav>
        <div className='hidden md:flex items-center gap-2'>
            <span className='cursor-pointer hover:bg-slate-200 rounded-lg'>🔍</span>
            <button className='bg-orange-500 flex items-center justify-center text-white font-semibold rounded-md h-10 w-full p-2 cursor-pointer hover:bg-orange-600 hover:scale-105 transition-transform duration-200' onClick={handleRegisterClick}>Registrar Negocio</button>
        </div>
        <button 
            className='md:hidden'
            onClick={() => setIsMobilOpen(!isMobilOpen)}
        >
            {isMobilOpen ? <p className='h-6 w-6'>x</p> : <p className='h-6 w-6'>☰</p>}
        </button>
         {/* Menú móvil */}
        {isMobilOpen && (
          <nav className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 px-4 py-4 space-y-3 shadow-md z-40">
            <a href="#explorar" onClick={() => setIsMobilOpen(false)} className="block text-gray-700 hover:text-orange-600">Explorar</a>
            <a href="#categorias" onClick={() => setIsMobilOpen(false)} className="block text-gray-700 hover:text-orange-600">Categorías</a>
            <a href="#negocios" onClick={() => setIsMobilOpen(false)} className="block text-gray-700 hover:text-orange-600">Para Negocios</a>
            <a href="#contacto" onClick={() => setIsMobilOpen(false)} className="block text-gray-700 hover:text-orange-600">Contacto</a>
            <div className="pt-2">
              <button
                className="w-full bg-orange-500 text-white font-semibold rounded-md h-10 px-4 py-2 hover:bg-orange-600 transition duration-200"
                onClick={() => {
                  setIsMobilOpen(false)
                  handleRegisterClick()
                }}
              >
                Registrar Negocio
              </button>
            </div>
          </nav>
        )}

        {showDevModal && (
            <>
            <div className="fixed inset-0 bg-black/40 bg-opacity-60 backdrop-blur-sm z-40" onClick={() => setShowDevModal(false)} />

            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-96'>
            <div className='flex flex-col justify-center'>

            <div className="flex justify-between items-center ">
                <br />
                <h1 className='text-xl font-bold'>🚧 En Desarrollo</h1>
                <button className='cursor-pointer font-bold' onClick={() => setShowDevModal(false)}>X</button>
            </div>
            <p className='mt-2 text-slate-600 text-center'>El registro automático de negocios está en desarrollo.</p>
            <p className='mt-2 text-slate-600 text-center'>Por ahora, para agregar tu negocio a tiendaticaCR, contáctanos directamente:</p>
            <button className="cursor-pointer bg-orange-500 w-full h-10 mt-3 mb-2 text-white rounded-lg hover:bg-orange-600 font-semibold" onClick={handleContactEmail}>Contactar por email</button>
            <span className='text-center text-slate-600'>prueba@gmail.com</span>
            </div>
                </div>  
        </>
        )}
    </header>
)}


export { Header }