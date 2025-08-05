import { Link } from "react-router-dom"
import NotaAnuncio from "../../../components/AddNote"
import FadeInSection from "../../../components/FadeInSection"
import { HouseSVG, Star } from "../../../components/SVGS/HouseSVG"
import CardsStats from "./CardsStats"
import "./hero.css"
function Hero() {
  return (
    <section className="mt-48 mb-24 " id="herosection">
        <FadeInSection>

        <h1 className="sm:text-7xl text-5xl font-bold text-center">Descubrí los mejores 
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-red-500 bg-clip-text text-transparent"> negocios <br /> locales </span> 
            de Costa Rica
        </h1>
        <p className="text-center text-slate-600  sm:text-2xl p-3 mt-3">Conectamos negocios costarricenses con su comunidad. Descubre<br /> servicios únicos, productos artesanales y experiencias auténticas en Costa Rica.</p>
        <div className="flex justify-center flex-wrap items-center gap-4 mt-8">
            <a href="#negocios" 
                className="bg-gradient-to-r from-green-600 to-blue-500 cursor-pointer text-white py-3 px-18 rounded-md font-semibold flex items-center hover:scale-105 transition-transform duration-200 hover:shadow-lg">
                Explorar Negocios 
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-5 w-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
            </a>
            <Link to="/dashboard" className="border border-green-700 hover:bg-green-100 hover:text-black cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-200 text-green-700 py-3 px-18 rounded-md font-semibold">
                Registar mi Negocio
            </Link>

        </div>
        <FadeInSection direction="right" delay={0.5}>

        <div className="flex justify-center gap-16 flex-wrap mt-10">
            <CardsStats 
                svg={<HouseSVG />}
                stat="10+"
                text="Negocios Ticos"
                textColor ="text-green-600"
                bgColor="bg-green-200"
            />
            <CardsStats 
                svg={<Star/>}
                text="Ticos Conectados"
                stat="1k+"
                textColor ="text-blue-600"
                bgColor="bg-blue-200"
            />
            <CardsStats 
                svg={<Star />}
                text="Calificación"
                stat="4.9"
                textColor="text-yellow-600"
                bgColor="bg-yellow-200"
            />
        </div>
        </FadeInSection>
        </FadeInSection>

        <NotaAnuncio />
    </section>
  )
}

export { Hero }