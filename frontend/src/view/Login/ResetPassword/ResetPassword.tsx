import { useState } from 'react'
import supabase from '../../../Lib/SupabaseClient'
import Swal from 'sweetalert2'
export default function ResetPassword() {
    const [email, setEmail ] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:5173/update-password/"
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
            setMessage('Revisa tu correo para confirmar el cambio de contraseña')
            Swal.fire({
                title: 'Correo de confirmación enviado',
                text: 'Revisa tu correo para restablecer tu contraseña',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            })
        }
    }


  return (
    <section className='mt-24 flex flex-col items-center justify-center'>
        <h2 className='text-4xl font-bold mb-3'>Cambio de contraseña</h2>
        <p className='font-semibold text-lg mb-3'>Ingresa tu correo electrónico para recibir un correo de recuperación</p>
        <form className='w-full max-w-md flex flex-col gap-5 mb-10' onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder='Correo electrónico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-2 p-2 rounded-md'
                required
            />
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer'>Enviar correo de recuperación</button>

        </form>
        {message && <p className='mt-4'>{message}</p>}
    </section>
  )
}
