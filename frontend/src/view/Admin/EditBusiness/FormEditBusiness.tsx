import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { updateTotalBusiness } from "../../../service/negocios.server"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"


function FormEditBusiness() {
  const navigate = useNavigate()
  const businessForEdit = useSelector(
    (state: any) => state.datosNegociosRedux.negocio?.datos?.[0]
  )

  const [form, setForm] = useState({
    p_negocioid: 0,
    p_nombre: '',
    p_descripcion: '',
    p_email: '',
    p_telefono: '',
    p_direccion: '',
    p_red_social_1: '',
    p_red_social_2: '',
    p_img_url_1: '',
    p_id_admin: 0,
    p_id_categoria: '',
    p_img_url_2: '',
    p_img_url_3: '',
    p_estado: true
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const guardar = async (e: any) => {
    e.preventDefault()
    try {
      if (
        form.p_nombre === '' ||
        form.p_descripcion === '' ||
        form.p_email === '' ||
        form.p_telefono === '' ||
        form.p_direccion === '' ||
        form.p_id_categoria === ''
      ) {
        Swal.fire({
          icon: 'info',
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos',
          confirmButtonText: 'Aceptar'
        })
        return
      } else {
        const result = await updateTotalBusiness(form)
        if (result) {
          navigate("/")
        }
      }
    } catch (e) {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el negocio',
      })
    }
  }

  const initialData = () => {
    if (businessForEdit) {
      setForm({
        p_negocioid: businessForEdit.negocioid,
        p_nombre: businessForEdit.nombre || '',
        p_descripcion: businessForEdit.descripcion || '',
        p_email: businessForEdit.email || '',
        p_telefono: businessForEdit.telefono || '',
        p_direccion: businessForEdit.direccion || '',
        p_red_social_1: businessForEdit.red_social_1 || '',
        p_red_social_2: businessForEdit.red_social_2 || '',
        p_img_url_1: businessForEdit.img_url_1 || '',
        p_id_admin: businessForEdit.id_admin || 0,
        p_id_categoria: businessForEdit.id_categoria || 0,
        p_img_url_2: businessForEdit.img_url_2 || '',
        p_img_url_3: businessForEdit.img_url_3 || '',
        p_estado: businessForEdit.estado ?? true
      })
    }
  }

  useEffect(() => {
    initialData()
  }, [businessForEdit])

  return (
    <section className="flex flex-col items-center justify-center mt-5">
      <form
        onSubmit={guardar}
        className="flex flex-col gap-4 border border-slate-300 rounded-lg w-full max-w-xl p-6 shadow-md bg-white"
      >
        <h2 className="text-xl font-bold text-center text-sky-600">
          Edita tu negocio
        </h2>

        <label className="font-semibold">Nombre *</label>
        <input
          type="text"
          name="p_nombre"
          value={form.p_nombre}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Descripción *</label>
        <textarea
          name="p_descripcion"
          value={form.p_descripcion}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Email *</label>
        <input
          type="email"
          name="p_email"
          value={form.p_email}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Teléfono *</label>
        <input
          type="number"
          name="p_telefono"
          value={form.p_telefono}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Dirección *</label>
        <input
          type="text"
          name="p_direccion"
          value={form.p_direccion}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Red Social 1 *</label>
        <input
          type="text"
          name="p_red_social_1"
          value={form.p_red_social_1}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Red Social 2 *</label>
        <input
          type="text"
          name="p_red_social_2"
          value={form.p_red_social_2}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Imagen 1 *</label>
        <input
          type="text"
          name="p_img_url_1"
          value={form.p_img_url_1}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Imagen 2 (opcional)</label>
        <input
          type="text"
          name="p_img_url_2"
          value={form.p_img_url_2}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <label className="font-semibold">Imagen 3 (opcional)</label>
        <input
          type="text"
          name="p_img_url_3"
          value={form.p_img_url_3}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <div className="flex items-center gap-2">
          <label className="font-semibold">Activo</label>
          <input
            type="checkbox"
            name="p_estado"
            checked={form.p_estado}
            className="border rounded cursor-pointer"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-sky-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-sky-400 transition cursor-pointer"
        >
          Guardar
        </button>
      </form>
    </section>
  )
}


export { FormEditBusiness }