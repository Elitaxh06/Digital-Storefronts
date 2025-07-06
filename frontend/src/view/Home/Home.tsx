import { useState, useEffect } from 'react'
import type { RespuestaApiNegocios } from '../../types'
import { getNegocios } from '../../service/negocios.server'


export default function Home() {
    const [datos, setDatos ] = useState<RespuestaApiNegocios | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const getInitialData = async () => {
      try{
        const data = await getNegocios()
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
    <main>
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
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{datos?.respuestaMensaje}</td>
                  <td>{datos?.respuestaMensaje}</td>
                  <td>{datos?.respuestaMensaje}</td>
                  <td>{datos?.respuestaMensaje}</td>
                  <td>{datos?.respuestaMensaje}</td>
                  <td>{datos?.respuestaMensaje}</td>
                </tr>
              </tbody>
            </table>
            <code>
                {/* <pre>{JSON.stringify(datos, null, 2)}</pre> */}
                
            </code>
          </div>
        )}
      </div>
    </main>
  )
}
