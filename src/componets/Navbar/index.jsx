import { useContext } from "react"
import { NavLink,  } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { EstudianteContex } from "../../Context"
const Navbar = () => {

    const navigate = useNavigate()
    const { setErrorLogin }=useContext(EstudianteContex)

    const cerrarSession =() => {
        localStorage.removeItem('user')
        setErrorLogin(false)
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " to='/estudiantes'>Estudiantes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " to='/materias'>
                                Materias
                            </NavLink>
                        </li>
                    </ul>
                    <ul className=" navbar-nav d-flex justify-content-end">
                        <li className="nav-item">
                            <button className="nav-link " onClick={() => cerrarSession()} >
                                Cerrar sesion
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar