import { useState } from "react";
import { insertBussiness } from "../../service/negocios.server";
import { postUploadImages } from "../../service/negocios.server";
import Swal from "sweetalert2";
import { showInfoAlert } from "../../helpers/Swal/InfoAlertSwal";
import type { Admin } from '../../types';

type Props = {
    admin: Admin
}

export default function FormAddBussiness({ admin }: Props) {

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
    const [idCategoria, setIdCategoria] = useState<string | null>(null);

    // Función para subir la imagen al backend
    // const uploadFile = async (file: File) => {
    // const formData = new FormData();
    // formData.append("file", file);

    // const res = await fetch("http://localhost:3000/api/uploadImage", {
    //   method: "POST",
    //   body: formData,
    // });

    // if (!res.ok) {
    //   const errorText = await res.text();
    //   throw new Error(`Error subiendo imagen: ${errorText}`);
    // }

    // const data = await res.json();
    // if (!data.publicUrl) throw new Error("No se obtuvo URL de la imagen");
    // return data.publicUrl; // ✅ ahora devuelve lo que tu backend envía
    // };
    const insertBussinessHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneRegex = /^[0-9]{8}$/;
        if (!phoneRegex.test(telefono)) {
            showInfoAlert("El número de teléfono debe tener 8 dígitos y solo números.", "info");
            return;
        }

        if (!nombre || !descripcion || !email || !telefono || !direccion || !redSocial1.trim() || !redSocial2.trim() || (!imgUrl1 && !file1) || !idCategoria) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos.",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        try {
            let url1 = file1 ? await postUploadImages(file1) : imgUrl1;
            let url2 = file2 ? await postUploadImages(file2) : imgUrl2;
            let url3 = file3 ? await postUploadImages(file3) : imgUrl3;
            
            const fullRedSocial1 = `https://instagram.com/${redSocial1}`;
            const fullRedSocial2 = `https://facebook.com/${redSocial2}`;

            const result = await insertBussiness({
                nombre,
                descripcion,
                email,
                telefono,
                direccion,
                redSocial1: fullRedSocial1,
                redSocial2: fullRedSocial2,
                imgUrl1: url1 || "",
                imgUrl2: url2 || "",
                imgUrl3: url3 || "",
                idAdmin: admin.adminid,
                idCategoria,
                estado: true
            });

            if (result) {
                Swal.fire({
                    icon: "success",
                    title: "Negocio registrado",
                    text: result.respuestaMensaje
                });

                // Limpiar formulario
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

        } catch (e: unknown) {
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
                console.error("Error al insertar el negocio:", e);
            }
        }
    };

    return (
        <section>
            <div className="flex flex-col items-center justify-center">
                <form className="bg-white p-8 w-full max-w-2xl" onSubmit={insertBussinessHandler}>
                    <h2 className="text-xl font-semibold text-blue-700 mb-6">📇 Información Para El Negocio</h2>

                    {/* Nombre */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Nombre *</label>
                        <input type="text" placeholder="Ej: Mi Cafeteria" value={nombre} onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    {/* Descripción */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Descripción *</label>
                        <input type="text" placeholder="Ej: Negocio con los mejores cafés..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Correo Electrónico *</label>
                        <input type="email" placeholder="Ej: mi-negocio@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    {/* Teléfono */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Teléfono *</label>
                        <input type="tel" placeholder="Ej: 88888888" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    {/* Dirección */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Dirección *</label>
                        <input type="text" placeholder="Ej: Calle 8, Barrio Escalante" value={direccion} onChange={(e) => setDireccion(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    {/* Redes Sociales */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Instagram *</label>
                        <input type="text" placeholder="Usuario de Instagram" value={redSocial1} onChange={(e) => setRedSocial1(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Facebook *</label>
                        <input type="text" placeholder="Usuario de Facebook" value={redSocial2} onChange={(e) => setRedSocial2(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    {/* Imágenes */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Imagen 1 *</label>
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files? e.target.files[0] : null
                            setFile1(file);
                            if (file) {
                              setImgUrl1(URL.createObjectURL(file)); // ✅ genera preview inmediato
                            } else {
                              setImgUrl1("");
                            }
                        }}    
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer" required />

                        {imgUrl1 &&(
                            <img src={imgUrl1}
                                alt="Imagen 1"
                                className="mt-2 w-32 h-32 object-cover rounded shadow"
                            />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Imagen 2 (opcional)</label>
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files? e.target.files[0] : null
                            setFile1(file);
                            if (file) {
                              setImgUrl2(URL.createObjectURL(file)); 
                            } else {
                              setImgUrl2("");
                            }
                        }}    
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer" />
                        {imgUrl2 &&(
                            <img src={imgUrl2}
                            alt="Imagen 1"
                            className="mt-2 w-32 h-32 object-cover rounded shadow"
                            />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Imagen 3 (opcional)</label>
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files? e.target.files[0] : null
                            setFile3(file);
                            if (file) {
                              setImgUrl3(URL.createObjectURL(file));
                            } else {
                              setImgUrl3("");
                            }
                        }}    
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer" 
                        />
                        {imgUrl3 &&(
                            <img src={imgUrl3}
                                alt="Imagen 3"
                                className="mt-2 w-32 h-32 object-cover rounded shadow"
                            />
                        )}
                    </div>

                    {/* Categoría */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Categoría *</label>
                        <select value={idCategoria ?? ''} onChange={(e) => setIdCategoria(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                            <option value="">Seleccione una categoría</option>
                            <option value="1">Restaurante</option>
                            <option value="2">Moda</option>
                            <option value="3">Belleza y Estética</option>
                            <option value="4">Mecánicos y Automotriz</option>
                            <option value="5">Tienda Variedad</option>
                            <option value="6">Educación y Cursos</option>
                            <option value="7">Tecnología</option>
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
    );
}
