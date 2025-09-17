import { Route, Routes } from "react-router-dom"
import { Page_404 } from "../view/Errors/404_Page"
import { Login } from "../view/Login/Login"
import { Wrapper } from "../view/Login/Wrapper"
import { Dashboard } from "../view/Admin/Dashboard"
import Home from "../view/Home/Home"
import { Register } from "../view/Login/Register"
import { EditBusiness } from "../view/Admin/EditBusiness/EditBusiness"
import ResetPassword from "../view/Login/ResetPassword/ResetPassword"
import UpdatePassword from "../view/Login/ResetPassword/UpdatePassword"

function RoutesMain() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword/>} />
        
            <Route path="/dashboard" element={
                <Wrapper>
                    <Dashboard />
                </Wrapper>
                } />
                <Route path="/editarNegocio" element={
                    <Wrapper>
                        <EditBusiness />
                    </Wrapper>
                } />


            <Route path="/*" element={<Page_404 />} />
        </Routes>
    )
}   

export { RoutesMain }
