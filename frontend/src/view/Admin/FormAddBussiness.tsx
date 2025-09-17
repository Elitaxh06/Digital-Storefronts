import { useState } from "react"
import { insertBussiness } from "../../service/negocios.server"
import Swal from "sweetalert2";
import { showInfoAlert } from "../../helpers/Swal/InfoAlertSwal";
import type { Admin } from '../../types';
import supabase from "../../Lib/SupabaseClient";

type Props = {
    admin: Admin
}
export default function FormAddBussiness({admin}: Props) {

  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);

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


  const uploadFile = async (file: File, nombrePrefix: string) => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${nombrePrefix}-${Date.now()}.${fileExt}`
    const filePath = `negocios/${fileName}`

    const { error } = await supabase.storage
      .from("negocios")
      .upload(filePath, file)

      if(error) throw error

      const { data } = await supabase.storage
        .from("negocios")
        .getPublicUrl(filePath)

      return data.publicUrl
  }

  const insertBussinessHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    const phoneRegex = /^[0-9]{8}$/ 
      if(!phoneRegex.test(telefono)){
          showInfoAlert("El número de teléfono debe contener solo numero  tiene que ser de 8 dígitos.", "info")   
          return
    }
    if(!nombre || !descripcion || !email || !telefono || !direccion || !redSocial1.trim() || !redSocial2.trim() || (!imgUrl1 && !file1) || !idAdmin || !idCategoria) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
        confirmButtonText: "Aceptar"
      });
      return
    }
    try{
      let url1 = imgUrl1    
      let url2 = imgUrl2  
      let url3 = imgUrl3    

      if(file1) url1 = await uploadFile(file1, "img1")
      if(file2) url2 = await uploadFile(file2, "img2")
      if(file3) url3 = await uploadFile(file3, "img3")
        
      const fullRedSocial1 = `https://instagram.com/${redSocial1}`
      const fullRedSocial2 = `https://facebook.com/${redSocial2}`

        const result = await insertBussiness({
        nombre,
        descripcion,
        email,
        telefono,
        direccion,
        redSocial1: fullRedSocial1,
        redSocial2: fullRedSocial2,
        imgUrl1: url1,
        imgUrl2: url2,
        imgUrl3: url3,
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
        setFile1(null);
        setFile2(null);
        setFile3(null);
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
          console.error("Error al insertar el Negocio:", e);
      }
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
            <label className="block text-sm font-medium mb-1">Nombre *</label>
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
            <label className="block text-sm font-medium mb-1">Descripción *</label>
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
              placeholder="EL usuario deinstagram"
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
              placeholder="El usuario de facebook"
              value={redSocial2}
              onChange={(e) => setRedSocial2(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Imagen URL 1 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Imagen 1 *</label>
            <input
              type="file"
              placeholder="imagen"
              accept="image/*"
              
              onChange={(e) => setFile1(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              required
            />
          </div>

          {/* Imagen URL 2 (opcional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Imagen 2 (opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile2(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
            />
          </div>

          {/* Imagen URL 3 (opcional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Imagen 3 (opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile3(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
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
