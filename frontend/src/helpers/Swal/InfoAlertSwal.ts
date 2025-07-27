import Swal from "sweetalert2";

export const showInfoAlert = (text: string, icon: "info" | "error" | "success" | "warning") => {
    Swal.fire({
        icon: icon || "info",
        title: "Para su información",
        text: text,
        confirmButtonText: "Aceptar"
    })
}