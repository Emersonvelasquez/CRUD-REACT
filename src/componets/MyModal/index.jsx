import { useContext } from "react"
import { EstudianteContex } from "../../Context"

const MyModal = ({ title , children , cerrarModal , aceptarCambios , textButtonSuccess}) => {

    const {  isEdit, errorLogin  , errores } = useContext(EstudianteContex)
    return (
        <>
        <div className="d-flex justify-content-center align-items-center" 
        style={{zIndex: 1 , position:'fixed' , left : 0 , top : 0 , width: '100%' , height:'100%'  , background:'rgba(34,34,34,0.90)'}}>
        <div className="p-2 bg-info w-50"
        style={{zIndex: 1 , position:'absolute'}}
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between" 
                        onClick={()=> cerrarModal(false)}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel"> 
                            {title}
                            </h1>
                            <button type="button"
                                className="btn-close"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className={errorLogin ? "alert alert-danger" : 'hidden'} role="alert">
                                <ul>
                                    {
                                        errores.map(error => (
                                            <li key={error}>{error}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                            className="btn btn-danger" 
                            onClick={() => cerrarModal(false)}
                            >cerrar</button>
                            <button 
                            onClick={() => aceptarCambios()
                                // isEdit ? updateStudent(id, form) : saveUser()
                            } 
                            type="button" className="btn btn-outline-success" 
                            >
                                {textButtonSuccess}
                                {textButtonSuccess ? '' :  isEdit ? 'actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default MyModal
