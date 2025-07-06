import { useState, useEffect } from 'react'
import { getAdmins } from './service/admins.server'
import type { RespuestaApi } from './types/types'
import './App.css'


function App() {

  const [datos, setDatos ] = useState<RespuestaApi | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const getInitialData = async () => {
    try{
      const data = await getAdmins()
      setDatos(data)
      console.log('data', datos)
      setLoading(false)
    }catch(e){
      console.log('Error al obtener los datos', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
      getInitialData()
  }, [])
  if(loading) return <p>Cargando...</p>
  return (
    <>
      <h1>{datos?.mensaje}</h1>
      <div>
        {Array.isArray(datos?.datos) && datos.datos.length > 0 ? (
          <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {datos.datos.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.nombre}</td>
                <td>{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <div>
            <code>
                <pre>{JSON.stringify(datos, null, 2)}</pre>
                <p>{datos?.respuestaMensaje}</p>
                
            </code>
          </div>
        )}
      </div>
    </>
  )
}

export default App
