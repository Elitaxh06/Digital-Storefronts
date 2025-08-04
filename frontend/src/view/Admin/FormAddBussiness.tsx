import { useState } from "react"
import { insertBussiness } from "../../service/negocios.server"
import Swal from "sweetalert2";
import { showInfoAlert } from "../../helpers/Swal/InfoAlertSwal";
import type { Admin } from '../../types';

type Props = {
    admin: Admin
}
export default function FormAddBussiness({admin}: Props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [redSocial1, setRedSocial1] = useState('');
  const [redSocial2, setRedSocial2] = useState('');
  const [imgUrl1, setImgUrl1] = useState('');
  const [imgUrl2, setImgUrl2] = useState('');
  const [imgUrl3, setImgUrl3] = useState('');
  const [idAdmin ] = useState<number | null>(admin.adminid);
  const [idCategoria, setIdCategoria] = useState<string | null>(null);


  const insertBussinessHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    const phoneRegex = /^[0-9]{8}$/ 
      if(!phoneRegex.test(telefono)){
          showInfoAlert("El número de teléfono debe contener solo numero  tiene que ser de 8 dígitos.", "info")   
          return
    }
    if(!nombre || !descripcion || !email || !telefono || !direccion || !redSocial1 || !redSocial2 || !imgUrl1 || !idAdmin || !idCategoria) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
        confirmButtonText: "Aceptar"
      });
      return
    }
    try{

      const result = await insertBussiness({
        nombre,
        descripcion,
        email,
        telefono,
        direccion,
        redSocial1,
        redSocial2,
        imgUrl1,
        imgUrl2,
        imgUrl3,
        idAdmin: admin.adminid,
        idCategoria,
        estado: true
      })
      if(result){
        Swal.fire({
          icon: "success",
          title: "Negocio registrado",
          text: result.respuestaMensaje
        })
        setNombre("");
        setDescripcion("");
        setEmail("");
        setTelefono("");
        setDireccion("");
        setRedSocial1("");
        setRedSocial2("");
        setImgUrl1("");
        setImgUrl2("");
        setImgUrl3("");
        setIdCategoria("");
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
      console.error("Error al insertar el Negocio:", e);
      return;
    }
  }

  return (
    <section className=''>
        <div className="flex flex-col items-center justify-center">
          <form  className="bg-white p-8 w-full max-w-2xl" onSubmit={insertBussinessHandler}>
          <h2 className="text-xl font-semibold text-blue-700 mb-6">📇 Información Para El Negocio</h2>
          <p className="text-sm text-gray-600 mb-4">Información básico sobre tu negocio</p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tu Nombre *</label>
            <input
              type="text"
              placeholder="Ej: Mi Cafeteria"
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
              placeholder="Ej: Negocio con los mejores cafés de Costa Rica..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Correo Electrónico *</label>
            <input
              type="email"
              placeholder="Ej: mi-negocio@email.com"
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
          {/* Dirección */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Dirección *</label>
            <input
              type="text"
              placeholder="Ej: Calle 8, Barrio Escalante, San José"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Red Social 1 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Red Social 1 *</label>
            <input
              type="text"
              placeholder="Ej: https://instagram.com/tu-negocio"
              value={redSocial1}
              onChange={(e) => setRedSocial1(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Red Social 2 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Red Social 2 *</label>
            <input
              type="text"
              placeholder="Ej: https://facebook.com/tu-negocio"
              value={redSocial2}
              onChange={(e) => setRedSocial2(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Imagen URL 1 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Imagen URL 1 *</label>
            <input
              type="text"
              placeholder="URL de imagen"
              value={imgUrl1}
              onChange={(e) => setImgUrl1(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Imagen URL 2 (opcional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Imagen URL 2 (opcional)</label>
            <input
              type="text"
              placeholder="URL de imagen"
              value={imgUrl2}
              onChange={(e) => setImgUrl2(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Imagen URL 3 (opcional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Imagen URL 3 (opcional)</label>
            <input
              type="text"
              placeholder="URL de imagen"
              value={imgUrl3}
              onChange={(e) => setImgUrl3(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* ID Admin (solo lectura o hidden si ya lo tenés) */}
          <input
            type="hidden"
            value={idAdmin ?? ''}
            readOnly
          />

          {/* ID Categoría */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Categoría *</label>
            <select
              value={idCategoria ?? ''}
              onChange={(e) => setIdCategoria(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="1">Restaurante</option>
              <option value="2">Moda</option>
              <option value="3">Belleza y Estética</option>
              <option value="4">Mecánicos y Automotriz</option>
              <option value="5">Tienda Variedad</option>
              <option value="6">Educación y Cursos</option>
              <option value="7">Tecnología</option>
              {/* Hacer esto dinamico con un select de las categorías de la base de datos */}
            </select>
          </div>

          <div className="flex justify-between items-center">

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer">
                Agregar Negocio
            </button>
          </div>
        </form>
        </div>
    </section>
  )
}
