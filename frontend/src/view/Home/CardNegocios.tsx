import { useState, useEffect } from "react"
import type { Negocios, RespuestaApiNegocios } from "../../types"
import { getNegocios } from "../../service/negocios.server"
function CardNegocios() {
    const [negocios, setNegocios ] = useState<RespuestaApiNegocios | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [showModal, setShowModal ] = useState<boolean>(false)

    const pruebaNegocios = [
        {
            id: 1, nombre: "Taller", description: "Tienda de repuestos de carro", nombre_categoria: "Mecánicos y Automotriz", img_url: "https://archivosysuministrosnacionales.com/wp-content/uploads/2020/10/repuestos-para-carro-asn-1.jpg", numero: 12343219, redes: "https://facebook.com", mail: 'info@cafe.com'
        },
        {
            id: 2, nombre: "Nails", description: "Salon de belleza", nombre_categoria: "Belleza y Estética", img_url: "https://i.pinimg.com/736x/3f/19/85/3f19851d5205025f8fd403ddf21a9936.jpg", numero: 12343219, redes: "https://facebook.com", mail: 'info@nails.com'
        }
    ]
    // const getInitialData = async () => {
    //     try{
    //         const data = await getNegocios()
    //         setNegocios(data)
    //         setLoading(false)
    //     }catch(e) { 
    //         console.log('Error al obtener los datos', e)
    //     }finally{
    //         setLoading(false)
    //     }
    // }
    // useEffect(() => {
    //     getInitialData()
    // }, [])

    if(!loading) return <p>Cargando...</p>
    return (
        <>
            <div className="">
                {Array.isArray(negocios?.datos) && negocios.datos.length > 0 ? (
                    <div>
                        {negocios.datos.map((negocio: Negocios ) => (
                            <div>
                                <img src="#" alt="Imagen de la tienda" />
                                <h2>{negocio.nombre}</h2>
                                <p>{negocio.descripcion}</p>
                                <span>{negocio.nombre_categoria}</span>
                                <button>Ver mas detalles</button>
                            </div>
                        ))}
                        
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  mx-2 my-4 rounded-lg">
                        {pruebaNegocios.map((negocio) => (
                            <div key={negocio.id} className="bg-white shadow-md p-4 flex flex-col mx-2 my-4 rounded-lg hover:-translate-y-2  transition-transform duration-200 hover:text-orange-500">
                                    <div className="flex flex-col justify-center ">
                                        <div>
                                            <p className="text-black">{negocio.nombre_categoria}</p>
                                            <img src={negocio.img_url} alt="Imagen de la tienda" className="object-cover h-48 w-full" />
                                        </div>
                                        <p className="mt-4 font-bold text-xl">{negocio.nombre}</p>
                                        <h3 className="text-slate-700">{negocio.description}</h3>
                                        <button className="bg-orange-600 hover:bg-orange-700 cursor-pointer text-white mt-4 h-10 rounded-lg font-semibold" onClick={() => setShowModal(true)}>Ver mas detalles</button>
                                </div>
                            </div>

                        ))}
                    </div>
                )}

                {/* MODAL */}
                {showModal && (
                    <>
                        {/* Fondo oscurecido */}
                        <div
                          className="fixed inset-0 bg-black/40 bg-opacity-60 backdrop-blur-sm z-40"
                          onClick={() => setShowModal(false)} // cerrar si hacen click fuera
                        />
                        {/* Contenido del modal */}
                        {pruebaNegocios.map((negocio) => (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-96">
                            <button onClick={() => setShowModal(false)} className=" text-lg cursor-pointer">❌</button>
                            <h2 className="text-xl font-bold mb-4">{negocio.nombre}</h2>
                            <img src={negocio.img_url} alt="Imagen de la tienda" className="object-cover h-48 w-full" />
                            <p>{negocio.description}.</p>
                            <p>Categoria: {negocio.nombre_categoria}</p>
                            <p>Contacto: {negocio.mail}</p>
                            <p>Redes:</p>
                            <a className="text-blue-800 font-semibold hover:text-blue-700 cursor-pointer" href={negocio.redes}>Facebook</a>
                            <br />
                            <div className="flex justify-around gap-1">
                                <button
                                  
                                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-orange-700 w-full"
                                  >
                                  Contactar
                                </button>
                                <button className="mt-4 px-4 py-2 border border-slate-600 rounded cursor-pointer hover:bg-slate-100 w-full">Compartir</button>
                                </div>
                        </div>
                        ))}
        </>
                )}
            </div>
        </>
    )
}

export { CardNegocios }