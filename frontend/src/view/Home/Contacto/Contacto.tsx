import type React from "react"
import EmailSVG from "../../../components/SVGS/EmailSVG"
import TelefonoSVG from "../../../components/SVGS/TelefonoSVG"
import UbicacionSVG from "../../../components/SVGS/UbicacionSVG"
import RelojsSVG from "../../../components/SVGS/RelojSVG"
import FadeInSection from "../../../components/FadeInSection"
type TypeContact = {
    logoSvg: React.ReactNode,
    titulo: string,
    texto: string,
    esLink: boolean,
    styleLogos: string
}

const CardsContacto = ({logoSvg, titulo, texto, esLink, styleLogos}: TypeContact) => {
    return (
      <FadeInSection direction="right" delay={0.5}>

        <div className="">
            <div className="flex items-start gap-4 p-2 border border-slate-300 rounded-xl mt-4">
                <span className={`${styleLogos} p-3 rounded-full`}>{logoSvg}</span>
                <div className="flex flex-col items-start">
                    <h4 className="text-xl font-semibold">{titulo}</h4>
                    {esLink ? <a href={texto} target="_blank" rel="noreferrer" className=' text-blue-600 hover:underline'>{texto}</a> : <p className='text-gray-600'>{texto}</p>}
                </div>
            </div>
        </div>
      </FadeInSection>
    )
}
export default CardsContacto

function Contacto() {
  return (
    <section className="bg-slate-50 py-16 px-4 md:px-12 lg:px-24 shadow-md text-center">
        <FadeInSection direction="left" delay={0.5}>

        <h1 className="text-4xl font-bold">Contáctanos</h1>
        
        <p className="text-slate-600 mt-4">Si tienes preguntas o necesitas ayuda, contáctanos a través de nuestro formulario de contacto.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-10 mt-10 items-start">
            <div className="flex flex-col gap-6">
                <CardsContacto logoSvg={<EmailSVG />} titulo="Email" texto="contacto@tiendaticacr.com" esLink={true}                          styleLogos="bg-orange-200"/>
                <CardsContacto logoSvg={<TelefonoSVG />} titulo="Teléfono" texto="+506 83745488"       esLink={false}                         styleLogos="bg-green-200"/>
                <CardsContacto logoSvg={<UbicacionSVG />} titulo="Ubicación" texto="San José, Costa Rica" esLink={false} styleLogos="bg-blue-200"/>
                <CardsContacto logoSvg={<RelojsSVG />} titulo="Horario de Atención" texto="Lunes a Viernes: 8:00 AM - 6:00 PM" esLink={false} styleLogos="bg-purple-300"/>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
                <h4 className="text-2xl font-semibold mb-4">Envíanos un Mensaje</h4>
                <form className="flex flex-col gap-4">
                <div className="flex flex-col text-left">
                  <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    required
                    type="text"
                    id="nombre"
                    placeholder="Tu nombre"
                    className="border border-slate-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    className="border border-slate-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <label htmlFor="mensaje" className="text-sm font-medium text-gray-700">Mensaje</label>
                  <textarea
                    required
                    id="mensaje"
                    rows={3}
                    placeholder="¿En qué podemos ayudarte?"
                    className="border border-slate-300 rounded-lg px-4 py-2 mt-1 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold mt-2 cursor-pointer"
                >
                  Enviar Mensaje
                </button>
          </form>
            </div>
        </div>
        </FadeInSection>

    </section>
    )
}

export { Contacto } 
