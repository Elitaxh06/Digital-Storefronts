import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../../../Lib/SupabaseClient"
import Swal from "sweetalert2";


export default function UpdatePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const { data: listener } = supabase.auth.onAuthStateChange(
        (event) => {
          if(event === 'PASSWORD_RECOVERY') {
            console.log('Usuario llegó desde link de recuperacion')
          }
        }
      )
      return () => listener.subscription.unsubscribe()
    }, [])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        })
        if(error){
            setMessage(`Hubo un error: ${error.message}`)
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
        }else{
            setMessage('Contraseña actualizada')
            Swal.fire({
                title: 'Contraseña actualizada',
                text: 'Ahora puedes iniciar sesión con tu nueva contraseña',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            })
            navigate("/login")
        }
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Restablecer contraseña</h2>
      <p className="text-center font-semibold text-lg mb-3">Ingresa tu nueva contraseña</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Actualizar contraseña
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  )
}
