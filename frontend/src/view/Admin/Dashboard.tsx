import { useState } from "react"
import supabase from "../../Lib/SupabaseClient"

import { useNavigate } from "react-router-dom"


function Dashboard(){
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
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

        <form  className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-blue-700 mb-6">📇 Información Personal</h2>
          <p className="text-sm text-gray-600 mb-4">Cuéntanos sobre ti como propietario</p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tu Nombre Completo *</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Correo Electrónico *</label>
            <input
              type="email"
              placeholder="Ej: juan@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Teléfono *</label>
            <input
              type="tel"
              placeholder="Ej: +52 55 1234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded">◀ Anterior</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Siguiente →
            </button>
          </div>
        </form>

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