
// HACER RESPONSIVE ESTA SECCION

export default function NotaAnuncio() {
  return (
      <section className="bg-amber-50  rounded-lg mt-10 p-4 shadow-md flex items-center justify-center ml-72 mr-72 h-42">
        <div className="">
            <div className="flex items-center justify-center gap-3">

            <span className="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb h-5 w-5 text-amber-600 mt-0.5"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg></span>
            <h3 className="text-center text-md text-black pt-2 flex-1">¿Querés una página completa y personalizada para tu negocio?</h3>
            </div>
            <p className="text-center text-slate-600 mt-2">También ofrecemos el diseño de sitios web individuales, con secciones únicas, contacto directo, catálogo, redes sociales y más.</p>
            <div className="flex justify-start items-center gap-4 ml-5 mt-4">
                <button className="shadow-md shadow-orange-200 bg-white hover:bg-orange-50 text-black cursor-pointer p-2 font-semibold rounded-md flex items-center justify-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"  stroke-linejoin="round" className="lucide lucide-mail h-3 w-3 mr-1"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2  7"></path></svg>
                    </span>
                    Contactanos
                </button>
                <button className="bg-orange-400 hover:bg-orange-500 text-white cursor-pointer p-2 rounded-md font-semibold flex items-center justify-center">
                    <span className="text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"  stroke-linejoin="round" className="lucide lucide-external-link h-3 w-3 mr-1"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0     0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                        </span>
                    Solicitarla aquí
                </button>
            </div>
        </div>
    </section>
  )
}
