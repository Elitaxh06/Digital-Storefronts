import { useState, useEffect } from "react"
import { esNegocio } from "../../../utils/typeGurdsRead"
import type { Business, ApiResponseBusiness } from "../../../types"
import FacebookSVG from "../../../components/SVGS/FacebookSVG"
import InstagramSVG from "../../../components/SVGS/InstagramSVG"
import { getNegocios } from "../../../service/negocios.server"
import FadeInSection from "../../../components/FadeInSection"
import XSVG from "../../../components/SVGS/XSVG"
import Fuse from "fuse.js"
import "./CardNegocios.css"
function CardNegocios() {
    const [business, setBusiness ] = useState<ApiResponseBusiness | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [showModal, setShowModal ] = useState<Business | null>(null)
    const [mostratCantidad, setMostartCantidad] = useState<number>(3)

    //constantes para filtrar negocios
    const [query, setQuery] = useState<string>("")
    const [filteredResults, setFilteredResults] = useState<Business[]>([])

        
    const cargarMas = () => {
        setMostartCantidad((prev) => prev + 3)
    }
    const cargarMenos = () => {
        if(mostratCantidad > 3){
            setMostartCantidad((prev) => prev - 3)
        }
    }
    const getInitialData = async () => {
        try{
            const data =await getNegocios()
            setBusiness(data)
            setLoading(false)
        }catch(e) { 
            console.log('Error al obtener los datos', e)
        }finally{
            setLoading(false)
        }
    }

   
    useEffect(() => {
        setTimeout(() => {
            getInitialData()

        }, 4000)
    }, [])


    useEffect(() => {
        if(business?.datos && esNegocio(business.datos)){
            const fuse = new Fuse(business.datos.activos, {
                keys: ["nombre", "nombre_categoria", "nombre_admin"], 
                threshold: 0.5
            })
            if(query.trim() ===""){ // si la busqueda (query) esta vacia, solo se muestran los negocios activos
                setFilteredResults(business.datos.activos)
            }else{
                const results = fuse.search(query)
                setFilteredResults(results.map(r=>r.item))
            }
        }
    }, [query, business])

    if(loading) return (
        <div className="spinnerContainer">
            <div className="spinner"></div>
            <p className="mt-3 font-semibold text-lg mb-24">Cargando negocios...</p>
        </div>


    )
    return (
        <>
            
            <div className="mt-22 bg-slate-[#FFFAF5]">
                {business?.datos && esNegocio(business.datos) ? (

                    <>
                    <FadeInSection direction="down" delay={0.5}>

                    <div className="flex justify-center my-6">
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar negocios..."
                            className="w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                        {filteredResults.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  mx-2 my-4 rounded-lg gap-6 gap-y-6 ml-10 mr-10">
                                {filteredResults.slice(0, mostratCantidad).map((business: Business) => (
                                    <div key={business.id ?? business.negocioid} className="bg-white pr-2 pl-2 mb-10 shadow-md flex flex-col h-full mx-2 rounded-lg hover:-translate-y-2 hover:shadow-2xl       transition-transform duration-200 hover:text-orange-500">
                                            <div className="flex flex-col">
                                                <div className="relative">
                                                    <img src={business.img_url_1} alt={`Imagen de la tienda ${business.nombre}`} className="object-cover h-48 rounded-t-lg w-full" />
                                                    <div className="absolute inset-0 bg- bg-opacity-50 flex justify-start items-start">
                                                        <p className="bg-slate-200 text-black text-sm rounded-xl py-1 px-2">{business.nombre_categoria}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-4 font-bold text-xl">{business.nombre}</p>    
                                                <p className="text-slate-600 mt-3">Emprendimiento presentado por {business.nombre_admin}</p>
                                                <h3 className="text-slate-700 flex-grow mt-3 line-clamp-1 desc">{business.descripcion}</h3>
                                                <p className="flex items-center text-slate-500 mt-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-4 w-4 mr-1"><path d="M20 10c0 6-8     12-8    12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>{business.direccion}</p>
                                                <div className="flex justify-center">  
                                                    <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer hover:scale-105 w-[90%] transition-transform duration-200 text-white h-10   rounded-lg  font-semibold mt-5" onClick={() => setShowModal(business)}>Ver mas detalles</button>
                                                </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h2 className="text-xl text-center font-bold my-5">
                                Ups... no hay coincidencias. Prueba con otro nombre o vuelve a la lista completa.
                            </h2>
                        )}
                        
                        {mostratCantidad < filteredResults.length ?(
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
                        </FadeInSection>
                    </>
                ) : (
                    <h2 className="text-xl text-center font-bold mt-5 pb-10">No hay negocios para mostrar</h2>
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
                            <div className="flex justify-end items-center py-3">
                                <button onClick={() => setShowModal(null)} className=" text-lg cursor-pointer">
                                    <XSVG />
                                </button>
                            </div>
                            <div className="flex justify-between items-center flex-wrap">
                                <h2 className="text-xl font-bold mb-4">{showModal.nombre}</h2>
                                <p className="bg-orange-100 text-red-600 text-sm rounded-xl py-1 px-2">Categoria: {showModal.nombre_categoria}</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-2">
                                <div className="flex flex-col">
                                    <img src={showModal.img_url_1} alt="Imagen de la tienda" className="object-cover h-44 w-full rounded-lg shadow-md shadow-orange-500/50" />
                                    <div className="flex justify-satart items-center mt-2 gap-3">

                                        {/* Validar si vienen las imagenes 2 y 3 si no vienen se pone la primera que si es obligatoria */}
                                        {showModal.img_url_2 ? (
                                            <img src={showModal.img_url_2} alt="Imagen de la tienda" className="object-cover w-24 h-24 shadow-sm  shadow-slate-600 rounded-md" />
                                        ): (
                                            <img src={showModal.img_url_1} alt="Imagen de la tienda" className="object-cover w-24 h-24 shadow-sm  shadow-slate-600 rounded-md" />
                                        )}

                                        {showModal.img_url_3 ? (
                                            <img src={showModal.img_url_3} alt="Imagen de la tienda" className="object-cover w-24 h-24 shadow-sm shadow-slate-600 rounded-md" />
                                        ): (
                                            <img src={showModal.img_url_1} alt="Imagen de la tienda" className="object-cover w-24 h-24 shadow-sm shadow-slate-600 rounded-md" />
                                        )}

                                    </div>
                                </div>
                                <div className="flex flex-col items-satart lg:pl-12">
                                    <h4 className="text-xl font-bold mt-1">Descripción</h4>
                                    <p className="text-slate-700 w-full mt-3">{showModal.descripcion}</p>
                                    <div className="bg-orange-100 border-l-4 border-orange-600 p-2 w-full mt-4 rounded-md">
                                        <p className="text-sm text-orange-800">Un emprendimiento de confianza, compartido por {showModal.nombre_admin}</p>
                                    </div>
                                    {/* seccion de contacto */}
                                    <div className="flex flex-col gap-4">
                                        <h4 className="mt-5 text-xl font-bold">Informacion de Contacto</h4>
                                        <p className="text-slate-700 flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-5 w-5 text-orange-600"><path d="M20  10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>{showModal.direccion}</p>

                                        <a href={`mailto:${showModal.email}`} target="_blank" className="mt-1 text-slate-700 flex gap-2 items-center hover:text-orange-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-5 w-5 text-orange-600"><rect width="20"    height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>{showModal.email}</a>

                                        <a href={`tel:${showModal.telefono}`} className="mt-1 text-slate-700 flex gap-2 items-center hover:text-orange-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-5 w-5 text-orange-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.13 1.21.37 2.39.7 3.5a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.58-1.58a2 2 0 0    1 2.11-.45c1.11.33 2.29.57    3.5.7a2    2    0    0    1    1.72    2Z"></path></svg>{showModal.telefono}</a>
                                    </div>

                                    {/* seccion de redes sociales  */}
                                    <h3 className="text-xl mt-5 font-bold">Redes Sociales</h3>
                                    <div className="flex gap-3 mt-3">
                                        <a className="text-slate-700 font-semibold cursor-pointer rounded-full bg-slate-200 hover:bg-orange-100 p-1.5" target="_blank" href={showModal.red_social_2}><FacebookSVG /></a>
                                        <a className="text-slate-700 font-semibold cursor-pointer rounded-full bg-slate-200 hover:bg-orange-100 p-1.5" target="_blank" href={showModal.red_social_1}><InstagramSVG /></a>
                                    </div>
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