import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SectionCards from './CardNegocios/SectionCards'
import { Hero } from './HeroMain/Hero'
import { SeccionBeneficios } from './SeccionInfoNegocios/SeccionBeneficios'
import { CTARegistrarNegocio } from './SeccionInfoNegocios/CTARegistroNegocio'
import { Contacto } from './Contacto/Contacto'
export default function Home() {
  const location = useLocation()
  useEffect(() => {
    if(location.hash){
      const element = document.querySelector(location.hash)
      if(element){
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])
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
