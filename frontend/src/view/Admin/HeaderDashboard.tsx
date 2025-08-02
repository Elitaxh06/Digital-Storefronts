// import {useEffect }from 'react'
// import { getAdminsById } from '../../service/admins.server'
// import type { Admin, ApiResponseAdmins } from '../../types';
// import { supabase } from "../../Lib/SupabaseClient"

// export default function HeaderDashboard() {


//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const profileData = await getProfile(); // función que llama tu backend
//         setUser(profileData);
//       } catch (error) {
//         console.error("Error cargando perfil", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProfile();
//   }, []);

//   if (loading) return <div>Cargando...</div>;

//   return (
//     <header>
//       {user ? (
//         <div>
//           <p>Bienvenido, {user.nombre} {user.apellidos}!</p>
//           <p>Email: {user.email}</p>
//           <p>Teléfono: {user.telefono}</p>
//         </div>
//       ) : (
//         <p>No hay datos de usuario</p>
//       )}
//     </header>
//   );
// }