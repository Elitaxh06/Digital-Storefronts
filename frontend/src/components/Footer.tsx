import FadeInSection from "./FadeInSection"
function Footer() {
    return (
        <footer className="bg-gray-900 text-white ">
            <div className="grid grid-cols lg:grid-cols-4 md:grid-cols-2 gap-6 ml-5 mr-5 pt-10 pb-10">
                <FadeInSection direction="right" delay={0.5}>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-8 w-8 text-orange-600"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></          path></svg>
                        <h2 className='text-lg font-bold'>TiendaticaCR</h2>
                    </div>
                    <p className="text-slate-400">La plataforma que conecta pequeños negocios costarricenses con su comunidad, promoviendo el comercio local y el emprendimiento.</p>
                    <div className="flex items-center gap-3">
                        <a href="https://facebook.com" target="_blank" className="hover:text-orange-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                        <a href="#" target="_blank" className="hover:text-orange-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"   strokeLinejoin="round" className="lucide lucide-instagram h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0     1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
                    </div>
                    
                </div>
                </FadeInSection>
                <div>
                    <FadeInSection direction="up" delay={0.5}>

                    <h2>Enlaces Rápidos</h2>
                    <ul className="text-slate-400 flex flex-col gap-1.5">
                        <li className="mt-2"><a className="hover:text-orange-400" href="#">Inicio</a></li>
                        <li><a className="hover:text-orange-400" href="#">Explorar Negocios</a></li>
                        <li><a className="hover:text-orange-400" href="#">Categorias</a></li>
                        <li><a className="hover:text-orange-400" href="#">Contacto</a></li>
                    </ul>
                    </FadeInSection>
                </div>
                <div>
                    <FadeInSection direction="up" delay={0.5}>

                    <h2>Categorías Populares</h2>
                    <ul className="text-slate-400 flex flex-col gap-1.5">
                        <li className="mt-1"><a className="hover:text-orange-400" href="#">Restaurante</a></li>
                        <li><a className="hover:text-orange-400" href="#">Belleza y Estética</a></li>
                        <li><a className="hover:text-orange-400" href="#">Mecánicos y Automotriz</a></li>
                        <li><a className="hover:text-orange-400" href="#">Educación y Cursos</a></li>
                        <li><a className="hover:text-orange-400" href="#">Tecnología</a></li>
                    </ul>
                    </FadeInSection>

                </div>
                <div>
                    <FadeInSection direction="left" delay={0.5}>

                    <h2>Contacto</h2>
                    <ul className="text-slate-400 flex flex-col gap-1.5">
                        <li className="mt-1"><a className="hover:text-orange-400" href="#">contacto@tiendaticacr.com</a></li>
                        <li><a href="#" className="hover:text-orange-400">+506 83745488</a></li>
                        <li><a href="#" className="hover:text-orange-400">San José, Costa Rica</a></li>
                    </ul>
                    </FadeInSection>
                </div>
            </div>
        </footer>
    )
}

export { Footer }