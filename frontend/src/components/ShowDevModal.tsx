type Props = {
    mostarModal: boolean,
    setMostarModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ShowDevModal({ mostarModal, setMostarModal }: Props) {
    return (
        <>
        {mostarModal && (
            <>
                    <div className="fixed inset-0 bg-black/40 bg-opacity-60 backdrop-blur-sm z-40" onClick={() => setMostarModal(false)} />
        
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-96'>
                    <div className='flex flex-col justify-center'>
        
                    <div className="flex justify-between items-center ">
                        <br />
                        <h1 className='text-xl font-bold'>🚧 En Desarrollo</h1>
                        <button className='cursor-pointer font-bold' onClick={() => setMostarModal(false)}>
                        </button>
                    </div>
                    <p className='mt-2 text-slate-600 text-center'>El registro automático de negocios está en desarrollo.</p>
                    <p className='mt-2 text-slate-600 text-center'>Por ahora, para agregar tu negocio a tiendaticaCR, contáctanos directamente:</p>
                    <button className="cursor-pointer bg-orange-500 w-full h-10 mt-3 mb-2 text-white rounded-lg hover:bg-orange-600 font-semibold">Contactar por email</button>
                    <span className='text-center text-slate-600'>prueba@gmail.com</span>
                    </div>
                        </div>  
            </>
            )}
        </>
    )
}

export { ShowDevModal }