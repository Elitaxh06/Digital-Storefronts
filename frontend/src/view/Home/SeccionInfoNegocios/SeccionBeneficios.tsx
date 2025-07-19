import FadeInSection from "../../../components/FadeInSection"

// import NotaAnuncio from "../../../components/NotaAnuncio"
type TypeCardBeneficios = {
    titulo: string,
    texto: string
}
const CardBeneficios = ({ titulo, texto }: TypeCardBeneficios)  => {
    return (
        <FadeInSection direction="right" delay={0.5}>

        <div className="flex flex-col items-center shadow-md shadow-slate-300 bg-white rounded-lg h-[10em] gap-5 pt-3 hover:-translate-y-3 transition-transform duration-200">
            <h4 className="text-xl font-semibold">{titulo}</h4>
            <p className="text-gray-600 max-w-[90%]">{texto}</p>
        </div>
        </FadeInSection>
    )
}


export default CardBeneficios

function SeccionBeneficios() {
  return (
    <section className="bg-slate-50 py-16 px-4 md:px-12 lg:px-24 shadow-md text-center">
        <FadeInSection>
            {/* <NotaAnuncio /> */}
            <h1 className="text-4xl font-bold">Explora Negocios Locales</h1>
            <p className="text-slate-600 text-xl mt-4">Descubre la diversidad de pequeños negocios costarricenses que han decidido crecer en línea. Desde <br />restaurantes familiares hasta   boutiques únicas.</p>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-[80%] h-full">
                    <CardBeneficios titulo="Fácil Navegación" texto="Encuentra rápidamente lo que buscas con nuestro sistema de categorías y filtros." />
                    <CardBeneficios titulo="Información Completa" texto="Cada negocio cuenta con información detallada, fotos y datos de contacto." />
                    <CardBeneficios titulo="Apoyo Local" texto="Contribuye al crecimiento de la economía local apoyando a pequeños emprendedores." />
                </div>
            </div>
        </FadeInSection>
    </section>
    )
}

export { SeccionBeneficios }
