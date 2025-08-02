import supabase from "../../Lib/SupabaseClient"

import { useNavigate } from "react-router-dom"
import RegisterAdmin from "./RegisterAdmin"


function Dashboard(){
    const navigate = useNavigate()
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if(error) throw error
        navigate("/login")
    }
    return(
        <section className="mt-24 mb-22">
            <div className="min-h-screen bg-[#eaf0ff] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Mis Negocios</h2>
        
        <ul>
          <li className="mb-3 font-medium text-gray-700">📋 Registrar Negocio</li>
          <li className="text-gray-500">❓ Ayuda</li>
        </ul>
        <div className="mt-10 p-4 bg-gradient-to-r from-yellow-50 to-orange-100 border border-yellow-300 rounded">
          <h3 className="font-semibold text-yellow-600 mb-1">⭐ Consejo</h3>
          <p className="text-sm text-yellow-700">
            Completa todos los campos para obtener la mejor experiencia. ¡Es muy fácil!
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold">Registra tu Negocio</h1>
          <span className="text-sm text-gray-600">Paso 1 de 3</span>
        </div>

        <div className="w-full bg-gray-200 h-1 rounded mb-8">
          <div className="bg-black h-1 rounded w-1/3"></div>
        </div>

        <RegisterAdmin />

        <div className="mt-10 bg-blue-100 border border-blue-300 text-blue-800 p-4 rounded max-w-2xl">
          <strong>¿Necesitas ayuda?</strong><br />
          Si tienes dudas, puedes contactarnos al teléfono <b>01-800-123-4567</b> o enviar un email a <b>ayuda@minegocio.com</b>.
        </div>
            <button className="p-3 rounded-md mt-6 text-white cursor-pointer bg-red-500 hover:bg-red-600" onClick={signOut}>Cerrar Sesión</button>

      </main>
    </div>
        </section>
    )
}

export { Dashboard }