import supabase from "../../Lib/SupabaseClient"
import { useNavigate } from "react-router-dom"


function Dashboard(){
    const navigate = useNavigate()
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if(error) throw error
        navigate("/login")
    }
    return(
        <section className="mt-24 mb-22">
            <h3>Dashboard</h3>
            <button onClick={signOut}>Cerrar Sesión</button>
        </section>
    )
}

export { Dashboard }