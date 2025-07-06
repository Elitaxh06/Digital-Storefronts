import { Route, Routes } from "react-router"
import Home from "../view/Home/Home"

function RoutesMain() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />


            
        </Routes>
    )
}   

export { RoutesMain }
