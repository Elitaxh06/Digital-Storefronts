import { useState, useEffect } from "react"
import { esNegocio } from "../../../utils/typeGurdsReadAdmins"
import type { Negocios, RespuestaApiNegocios } from "../../../types"
import { getNegocios } from "../../../service/negocios.server"
function CardNegocios() {
    const [negocios, setNegocios ] = useState<RespuestaApiNegocios | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [showModal, setShowModal ] = useState<Negocios | null>(null)
    const [mostratCantidad, setMostartCantidad] = useState<number>(3)
    const cargarMas = () => {
        setMostartCantidad((prev) => prev + 3)
    }
    const cargarMenos = () => {
        setMostartCantidad((prev) => prev - 3)
    }
    const getInitialData = async () => {
        try{
            const data = await getNegocios()
            setNegocios(data)
            setLoading(false)
        }catch(e) { 
            console.log('Error al obtener los datos', e)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getInitialData()
    }, [])
    
    if(loading) return <p className="">Cargando...</p>
    return (
        <>
            <div className="mt-22">
                {negocios?.datos && esNegocio(negocios.datos) ? (
                    <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  mx-2 my-4 rounded-lg gap-6 gap-y-6 ml-10 mr-10">
                        {negocios.datos.activos.slice(0, mostratCantidad).map((negocio: Negocios) => (
                            <div key={negocio.id} className="bg-white shadow-md p-4 flex flex-col h-full mx-2  rounded-lg hover:-translate-y-2  transition-transform duration-200 hover:text-orange-500">
                                    <div className="flex flex-col justify-center ">
                                        <div className="relative">
                                            <img src={negocio.img_url} alt="Imagen de la tienda" className="object-cover h-48 w-full" />
                                            <div className="absolute inset-0 bg- bg-opacity-50 flex justify-start items-start">

                                                <p className="bg-slate-200 text-black text-sm rounded-xl py-1 px-2">{negocio.nombre_categoria}</p>
                                            </div>
                                        </div>
                                        <p className="mt-4 font-bold text-xl">{negocio.nombre}</p>
                                        <h3 className="text-slate-700 flex-grow line-clamp-1 desc">{negocio.descripcion}</h3>
                                        <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white h-10 rounded-lg font-semibold mt-5" onClick={() => setShowModal(negocio)}>Ver mas detalles</button>
                                </div>
                            </div>

                        ))}
                    </div>
                        {mostratCantidad < negocios.datos.activos.length ?(
                            <div className="flex items-center justify-center">
                                <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white p-3 rounded-lg font-semibold mt-5 mb-5" onClick={cargarMas}>
                                    Cargar mas
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white p-3 rounded-lg font-semibold mt-5 mb-5" onClick={cargarMenos}>
                                    Ver menos
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>no hay negocios</p>
                )}

                {/* MODAL */}
                {showModal && (
                    <>
                        {/* Fondo oscurecido */}
                        <div
                          className="fixed inset-0 bg-black/30 bg-opacity-60 backdrop-blur-sm z-40"
                          onClick={() => setShowModal(null)} // cerrar si hacen click fuera
                        />
                        {/* Contenido del modal */}
                        
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50  w-[70%] max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setShowModal(null)} className=" text-lg cursor-pointer">❌</button>
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold mb-4">{showModal.nombre}</h2>
                                <p className="bg-orange-100 text-red-600 text-sm rounded-xl py-1 px-2">Categoria: {showModal.nombre_categoria}</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-2">
                                <div className="flex flex-col">
                                    <img src={showModal.img_url} alt="Imagen de la tienda" className="object-cover h-44 w-full rounded-lg shadow-md shadow-orange-500/50" />
                                    <div className="flex justify-satart items-center mt-2 gap-3">
                                        <img src={showModal.img_url} alt="Imagen de la tienda" className="object-cover w-24 h-24 shadow-sm  shadow-slate-600 rounded-md" />
                                        <img src={showModal.img_url} alt="Imagen de la tienda" className="object-cover w-24 h-24 shadow-sm shadow-slate-600 rounded-md" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-left">
                                    <h4 className="text-md font-bold mt-1 text-left">Descripcion</h4>
                                    <p className="mt-1 text-slate-700 w-full ml-2 mr-2 text-center">{showModal.descripcion}</p>
                                    <h4 className="mt-1 text-md font-bold">Informacion de Contacto</h4>
                                    <p className="text-slate-700">localizacion</p>

                                    <p className="mt-1 text-slate-700">{showModal.email}</p>
                                    <p className="mt-1 text-slate-700">Redes:</p>
                                    <h3 className="mt-1 text-md font-bold">Redes Sociales</h3>
                                    <a className="text-blue-800 font-semibold hover:text-blue-700 cursor-pointer" target="_blank" href="https://www.facebook.com">Facebook</a>
                                    <br />
                                    <div className="flex justify-around gap-1">
                                        <button
                                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600 w-full">   
                                          Contactar
                                        </button>
                                        <button className="mt-4 px-4 py-2 border border-slate-600 rounded cursor-pointer hover:bg-slate-100 w-full">Compartir</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        
                    </>
                )}
            </div>
        </>
    )
}

export { CardNegocios }