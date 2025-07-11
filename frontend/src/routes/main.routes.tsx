import { Route, Routes } from "react-router-dom"
import { Page_404 } from "../view/Errors/404_Page"
import Home from "../view/Home/Home"

function RoutesMain() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />


            <Route path="/*" element={<Page_404 />} />
        </Routes>
    )
}   

export { RoutesMain }
