import { useState } from "react";
import supabase from "../../Lib/SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { showInfoAlert } from "../../helpers/Swal/InfoAlertSwal";
function Login(){
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    // const [message, setMessage ] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        setEmail("")
        setPassword("")
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error){
            showInfoAlert(error.message, "info")
            // setMessage(error.message)
            setEmail("")
            setPassword("")
            return

        }
        if(data){
            navigate("/dashboard")
            return null
        }
    }
    return(
        <section className="mt-24 mb-18 px-4">
            <h3 className="text-center font-bold text-3xl">Login</h3>
            {/* {message && (
                <div className="flex justify-center my-3">
                    <span className="font-semibold text-center text-xl">{message}</span>
                </div>
            )} */}
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo Electronico</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className="flex items-center justify-between mb-6">
                <button type="submit" className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar Sesión</button>
            </div>
            <p>¿No tienes cuenta?
                <Link to="/register" className="text-blue-500 border-b border-blue-600 hover:text-blue-700"> Crear Cuenta</Link>
                
            </p>
            </form>
        </section>
    )
}

export { Login } 
