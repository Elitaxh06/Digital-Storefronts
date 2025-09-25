import React from "react"
import TiendaSVG from "../../../components/SVGS/TiendaSVG"
import ClientesSVG from "../../../components/SVGS/ClienteSVG"
import CrecimientoSVG from "../../../components/SVGS/CrecimientoSVG"
import ApoyoSVG from "../../../components/SVGS/ApoyoSVG"
import FadeInSection from "../../../components/FadeInSection"
import { Link } from "react-router-dom"
type TypeCTA = {
    logoSvg: React.ReactNode
    titulo: string,
    texto: string,
    style: string
}



const CardsCTA = ({logoSvg, titulo, texto, style}: TypeCTA) => {
    return (
        <FadeInSection direction="right" delay={0.5}>   
            <div className="flex flex-col items-center gap-2 pt-3 group">

                <span className={`${style} group-hover:scale-110 transition-transform duration-200 p-4 rounded-full group-hover:shadow-xl`}>{logoSvg}</span>
                <h4 className="text-xl font-semibold group-hover:text-orange-400">{titulo}</h4>
                <p className="text-gray-600">{texto}</p>
            </div>
        </FadeInSection>
    )
}

export default CardsCTA

function CTARegistrarNegocio() {
    return (
        <section className="bg-slate-50 py-16 px-4 md:px-12 lg:px-24 shadow-md text-center" id="tunegocio">
            <FadeInSection>
                <h1 className="text-5xl font-bold">¿Tienes un Negocio?</h1>
                <p className="text-slate-600 text-lg mt-4">Únete a tiendaticaCR y lleva tu negocio al mundo digital. Te ayudamos a conectar con más clientes y hacer crecer tu emprendimiento.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-8 mb-8">
                    <CardsCTA logoSvg={<TiendaSVG />} titulo="Presencia Online" texto="Crea tu perfil digital y muestra tus productos o servicios" style="bg-orange-200"/>
                    <CardsCTA logoSvg={<ClientesSVG />} titulo="Más Clientes" texto="Conecta con nuevos clientes en tu comunidad"                  style="bg-pink-200"/>
                    <CardsCTA logoSvg={<CrecimientoSVG />} titulo="Crecimiento" texto="Impulsa las ventas y el reconocimiento de tu marca"         style="bg-green-200"/>
                    <CardsCTA logoSvg={<ApoyoSVG />} titulo="Apoyo Local" texto="Forma parte de una comunidad que apoya lo local"                  style="bg-purple-300"/>

                </div>
                <Link to="/dashboard" className="bg-orange-600 text-white rounded-md px-6 py-3 cursor-pointer hover:bg-orange-700 font-semibold hover:scale-105 transition-transform duration-200">
                   Registrar mi Negocio
                </Link >
                <p className="text-slate-600 text-center mt-2">Contáctanos para más información</p>
            </FadeInSection>
        </section>
    )
}   

export { CTARegistrarNegocio }