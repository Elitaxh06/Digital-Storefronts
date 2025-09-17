import supabase from "../../Lib/SupabaseClient";
import { useState } from "react";
import { Link } from "react-router-dom";
import { showInfoAlert } from "../../helpers/Swal/InfoAlertSwal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate()
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setEmail("")
        setPassword("")
        setName("")
        setPhoneNumber("")

        const phoneRegex = /^[0-9]{8}$/ 
        if(!phoneRegex.test(phoneNumber)){
            showInfoAlert("El número de teléfono debe contener solo numeros y tiene que ser de 8 dígitos.", "info")   
            return
        }
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    phone: phoneNumber
                }
            }
        })
        if(error){
            showInfoAlert(error.message, "info")
            // setMessage(error.message);
            return;
        }
        if(data){
            Swal.fire({
                icon:"success",
                title: "Usuario creado con éxito",
                text: "Usuario creado con éxito. Por favor, verifica tu correo electrónico para completar el registro.",
                confirmButtonText: "Aceptar"
            }).then((result) => {
                if(result.isConfirmed){
                    navigate("/login")
                }
            })
        }
        setEmail("")
        setPassword("")
        setName("")
    }
    return(
        <section className="mt-24 mb-22 px-4">
            <h2 className="text-center font-bold text-3xl">Crear Cuenta</h2>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo Electronico</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder=" "  name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  required />
                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Teléfono</label>
                </div>
            </div>
            <div className="flex items-center justify-between mb-6">
                <button type="submit" className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crar Cuenta</button>
            </div>
            <p>Ya tienes cuenta 

            <Link to="/login" className="text-blue-500 border-b border-blue-600 hover:text-blue-700 hover:border-blue-800"> Iniciar Sesión</Link>
            </p>
            </form>
        </section>
    )
}

export { Register } 
