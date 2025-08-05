import React, { useState } from 'react';
import { insertAdmin } from '../../service/admins.server';
import Swal from 'sweetalert2';
import { showInfoAlert } from '../../helpers/Swal/InfoAlertSwal';
import supabase from '../../Lib/SupabaseClient';
import { useNavigate } from 'react-router-dom';
export default function RegisterAdmin() {
    const [nombre, setNombre] = useState<string>("");
    const [apellidos, setApellidos] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");

    const navigate = useNavigate()
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if(error) throw error
        navigate("/")
    }

    
    const insertAdminHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const phoneRegex = /^[0-9]{8}$/ 
        if(!phoneRegex.test(telefono)){
            showInfoAlert("El número de teléfono debe contener solo numeros y tiene que ser de 8 dígitos.", "info")   
            return
        }
        if(!nombre || !apellidos || !email || !telefono) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos.",
                confirmButtonText: "Aceptar"
            });
            return
        }
        try{
            const { data: { user }} = await supabase.auth.getUser();
            if(!user?.id){
                Swal.fire({
                    icon: "error",
                    title: "Error de autenticación",
                    text: "No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente."
                })
                return
            }
            
            const result = await insertAdmin({
                nombre,
                apellidos,
                email,
                telefono,
                estado : true,
                id_usuario_supabase: user.id
            })
            if(result){
                Swal.fire({
                    icon: "success",
                    title: "Administrador registrado",
                    text: result.respuestaMensaje
                })
                setNombre("");
                setApellidos("");
                setEmail("");
                setTelefono("");
            }
        }catch(e: unknown){
            if (e instanceof Error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: e.message
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un error inesperado"
                });
            }
            console.error("Error al insertar el administrador:", e);
            return;
        }
    }   
  return (
    <section className='flex flex-col items-center justify-center'>
        <form  className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl" onSubmit={insertAdminHandler}>
          <h2 className="text-xl font-semibold text-blue-700 mb-6">📇 Información Personal</h2>
          <p className="text-sm text-gray-600 mb-4">Cuéntanos sobre ti como propietario</p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tu Nombre *</label>
            <input
              type="text"
              placeholder="Ej: Juan"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tus Apellidos *</label>
            <input
              type="text"
              placeholder="Ej: Pérez Castro"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
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
              placeholder="Ej: 88888888"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer" onClick={() => signOut()}>◀ Cerrar Sesión</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer">
                Agregar Administrador
            </button>
          </div>
        </form>
    </section>
    )
}
