import { useEffect, useState } from "react"
import supabase from "../../Lib/SupabaseClient"
import { Navigate } from "react-router-dom"

function Wrapper({children}: any) {
  const[authenticated, setAuthenticated ] = useState(false)
  const [loading, setLoading ] = useState(true)

  

  useEffect(() => {

    const getSession = async() => {
      const {
        data: {session},
        
      } = await supabase.auth.getSession()
      setAuthenticated(!!session)
      setLoading(false)
    }
    getSession()
  }, [])

  if(loading){
    return <div className="my-14 text-center font-semibold text-lg">Cargando...</div>
  }else{
    if(authenticated){
      return <>{children}</>
    }
  }

  return <Navigate to="/login"/>
}


export { Wrapper }