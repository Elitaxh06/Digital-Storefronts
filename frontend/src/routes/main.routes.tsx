import { Route, Routes } from "react-router-dom"
import { Page_404 } from "../view/Errors/404_Page"
import { Login } from "../view/Login/Login"
import { Wrapper } from "../view/Login/Wrapper"
import { Dashboard } from "../view/Admin/Dashboard"
import Home from "../view/Home/Home"
import { Register } from "../view/Login/Register"

function RoutesMain() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
                <Wrapper>
                    <Dashboard />
                </Wrapper>
                } />


            <Route path="/*" element={<Page_404 />} />
        </Routes>
    )
}   

export { RoutesMain }
