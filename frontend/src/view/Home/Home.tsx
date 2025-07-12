
import SectionCards from './CardNegocios/SectionCards'
import { Hero } from './HeroMain/Hero'
import { SeccionBeneficios } from './SeccionInfoNegocios/SeccionBeneficios'
import { CTARegistrarNegocio } from './SeccionInfoNegocios/CTARegistroNegocio'
import { Contacto } from './Contacto/Contacto'
export default function Home() {

  return (
    <main>
      <Hero />
      <SectionCards />
      <SeccionBeneficios />
      <CTARegistrarNegocio />
      <Contacto />
    </main>
  )
}
