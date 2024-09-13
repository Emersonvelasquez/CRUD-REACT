import { useContext, useEffect } from 'react'
import MyModal from '../MyModal'
import { EstudianteContex } from '../../Context'

function Estudiantes() {

    const { handleForm, form, estudiantes, handleEdit, resetFrom, setValue, value, person, successCreateUser
        , isModalOpen, modalEliminar, setModalEliminar, handleDelete, deleteUsuarios, updateuser, setIsModalOpen, saveUser
        , next , back , users
    }
        = useContext(EstudianteContex)

    useEffect(() => {
        person()
    }, [updateuser, modalEliminar, successCreateUser, isModalOpen])
    const estuantesFilter = estudiantes.filter(student => student.name.includes(value))

    let cont = 0;

    return (
        <>
            {isModalOpen && <MyModal title={'crear usuario'}
                cerrarModal={setIsModalOpen}
                aceptarCambios={saveUser}
            >
                <div className="mb-3">

                    <input onChange={(event) => handleForm(event)} value={form.name} name='name' type="text" className="form-control" id="" placeholder="name" />
                </div>
                <div className="mb-3">

                    <input onChange={(event) => handleForm(event)} value={form.email} name='email' type="text" className="form-control" id="" placeholder="email" />
                </div>
                <div className="mb-3">

                    <input onChange={(event) => handleForm(event)} value={form.password} name='password' type="password" className="form-control" id="" placeholder="password" />
                </div>
                <div className="mb-3">

                    <input onChange={(event) => handleForm(event)} value={form.avatar} name='avatar' type="text" className="form-control" id="" placeholder="avatar" />
                </div>
            </MyModal>}
            {
                modalEliminar && <MyModal
                    title={'eliminar'}
                    cerrarModal={setModalEliminar}
                    aceptarCambios={deleteUsuarios}
                    textButtonSuccess='Eliminar' >
                    <div className=' d-flex justify-content-center gap-3 '>
                        <h1> are you sure ?</h1>
                    </div>
                </MyModal>
            }
            <div className='container text-center' >
                <div className='d-flex justify-content-end'>
                    <button
                        onClick={() => {
                            setIsModalOpen(true)
                            resetFrom()
                        }
                        }
                        type="button"
                        className='btn btn-primary'>create Estudiante</button>
                </div>
                <div className="input-group mb-3">
                    <input onChange={(event) => setValue(event.target.value)} type="text" className="form-control" aria-label="Text input with checkbox" />
                </div>

                <div className={successCreateUser || updateuser ? "alert alert-success" : 'hidden'} role="alert">
                    {updateuser && <p>Se ha actualizado correntamente</p>}
                    {successCreateUser && <p>se ha guardado correctamente</p>}
                </div>

                <table className='table table-striped'>
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Customer</th>
                            <th>Avatar</th>
                            <th>opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            estuantesFilter.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>{item.role}</td>
                                    <td><img src={item.avatar} alt="" height='100' width='100' /></td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Eliminar</button>
                                        
                                        <button onClick={() => handleEdit(item.id)}
                                            className='btn btn-outline-success'>editar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav className='d-flex justify-content-center' aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={back} >anterios</a></li>
                        {
                            users.map((item , index )=> {
                                
                                if(index % 10 == 0){
                                    return <li className="page-item"><a class="page-link" href="#">{cont++}</a></li>
                                }
                            })
                        }
                        <li className="page-item"><a className="page-link" onClick={next}>siguiente</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Estudiantes