import { BrowserRouter, Route, Routes, json } from "react-router-dom"
import Layout from "../componets/Layout"
import Login from "../componets/Login"
import Navbar from "../componets/Navbar"
import { Estudianteprovider } from "../Context"
import Materias from "../componets/Materias"

const index = () => {
    return (
        <>
        <BrowserRouter>
        <Estudianteprovider>
        <Routes>
            <Route  path="/" element={<Login/>}/>
            <Route path="/*" element={<Layout/>}/>
        </Routes>
        </Estudianteprovider>
        </BrowserRouter>
        </>
    )
}

export default index
