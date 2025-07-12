import { useState } from "react";
import { CardNegocios } from "./CardNegocios";
export default function SectionCards() {
    const [categoriaActiva, setCategoriaActiva] = useState<string>("Todas")
    
    
    // ESTOS DATOS TIENEN QUE VENIR DE LA BASE DE DATOS
    const categorias = [
    "Todas",
    "Restaurante",
    "Moda",
    "Belleza y Estética",
    "Mecánicos y Automotriz",
    "Tiendad Variedad",
    "Educación y Cursos",
    "Tecnología",
  ];
  return (
    <section className="bg-[#FFFEFD]">
        <h2 className="text-4xl font-bold text-center pt-14" id="negocios">Descubre Negocios Locales</h2>
        <p className="text-center text-slate-600 mt-4 text-lg">Explora una variedad de pequeños negocios que han decidido crecer en línea.<br />Cada uno con su historia única y servicios excepcionales.</p>
      
        <div className="flex justify-center items-center mt-10 flex-wrap gap-5">
            {categorias.map((cat) => (
              <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className=
              {`p-2 rounded-full border border-slate-300 transition-all cursor-pointer 
                ${
                  categoriaActiva === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white text-slate-700 hover:bg-orange-50"
                }
                `}
                >
                    {cat}
                </button>
            ))}
          </div>
        <CardNegocios />
    </section>

  )
}
