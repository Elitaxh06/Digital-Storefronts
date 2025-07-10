import NotaAnuncio from "../../../components/NotaAnuncio"

function Hero() {
  return (
    <section className="mt-48 mb-24">
        <h1 className="text-6xl font-bold text-center">Tu negocio local, <span className="text-orange-500">ahora en <br />línea</span></h1>
        <p className="text-center text-slate-600 text-2xl mt-3">Conectamos negocios costarricenses con su comunidad. Descubre<br /> servicios únicos, productos artesanales y experiencias auténticas en Costa Rica.</p>
        <div className="flex justify-center items-center gap-4 mt-8">
            <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white py-2 px-8 rounded-md font-semibold flex items-center">
                Explorar Negocios 
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-5 w-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
            </button>
            <button className="border border-slate-400 hover:bg-amber-50 cursor-pointer text-black py-2 px-8 rounded-md font-semibold">Registar mi Negocio</button>
        </div>
        <div className="flex justify-center items-center mt-10 gap-12">
            <div className="flex items-center flex-col gap-2">
                <span className="rounded-4xl p-2 shadow shadow-amber-500 "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store h-6 w-6 text-orange-600"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path></svg></span>
                <p className="font-bold">10+ Negocios</p>
                <p className="text-slate-600">Registrados en la plataforma</p>
            </div>
            <div className="flex items-center flex-col gap-2">
                <span className="rounded-4xl p-2 shadow shadow-amber-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-6 w-6 text-rose-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                <p className="font-bold">3,000+ Usuarios</p>
                <p className="text-slate-600">Descubriendo negocios locales</p>
            </div>
            <div className="flex items-center flex-col gap-2">
                <span className="rounded-4xl p-2 shadow shadow-amber-500 "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star h-6 w-6 text-yellow-600"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                <p className="font-bold">4.8 Estrella</p>
                <p className="text-slate-600">Calificación promedio</p>
            </div>
        </div>
        <NotaAnuncio />
    </section>
  )
}

export { Hero }