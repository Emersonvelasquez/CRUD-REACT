import { createContext, useState } from "react"
export const EstudianteContex = createContext()
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Estudianteprovider = ({ children }) => {

    const [form, setForm] = useState({ id: null, name: '', email: '', password: '', avatar: '' })
    const [estudiantes, setEstudiantes] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState(null)
    const navigate = useNavigate()
    const [errorLogin, setErrorLogin] = useState(false)
    const [value, setValue] = useState('')
    const [successCreateUser, setSuccessCreateUset] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [errores, setErrores] = useState([])
    const [updateuser, setUpdateuser] = useState(false)
    const [modalEliminar, setModalEliminar] = useState(false)
    const [users, setUsers] = useState([])

    const handleForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const [itemsByPage, setItemsByPage] = useState(10);

    const saveUser = async () => {
        try {
            if (isEdit) {
                try {
                    await axios.put(`https://api.escuelajs.co/api/v1/users/${id} `, form)
                    setIsModalOpen(false)
                    setUpdateuser(true)
                    setSuccessCreateUset(false)
                    setErrores([])
                } catch (err) {
                    if (err.status != 400) {
                        setErrores(['ocurrio un error en el servidor , intenta de nuevo'])
                        setErrorLogin(true)
                    } else {
                        setIsModalOpen(true)
                        setErrorLogin(true)
                        setErrores(err.response.data.message)
                    }
                }
            } else {
                await axios.post('https://api.escuelajs.co/api/v1/users/', form)
                setSuccessCreateUset(true)
                setIsModalOpen(false)
                setUpdateuser(false)
                setErrorLogin(false)
                setErrores([])
            }
        } catch (err) {
            setIsModalOpen(true)
            setSuccessCreateUset(false)
            setErrorLogin(true)
            setErrores(err.response.data.message)
        }
    }

    const handleEdit = async (id) => {
        setErrorLogin(false)
        setErrores([])
        setIsModalOpen(true)
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`)
        setForm(response.data)
        setIsEdit(true)
        setId(id)
    }

    const updateStudent = async (id, data) => {
        try {
            await axios.put(`https://api.escuelajs.co/api/v1/users/${id} `, data)
            setIsModalOpen(false)
            setUpdateuser(true)
            setSuccessCreateUset(false)
            setErrores([])
        } catch (err) {
            if (err.status != 400) {
                setErrores(['ocurrio un error en el servidor , intenta de nuevo'])
                setErrorLogin(true)
            } else {
                setIsModalOpen(true)
                setErrorLogin(true)
                setErrores(err.response.data.message)
            }
        }
    }

    const resetFrom = () => {
        setErrorLogin(false)
        setErrores([])
        setId(null)
        setIsEdit(false)
        setForm({ name: '', email: '', password: '', avatar: '' })
    }

    const login = async (event, email, password) => {
        event.preventDefault()
        try {
            const user = await axios.post('https://api.escuelajs.co/api/v1/auth/login',
                { email, password },
            )
            if (user.status == 201) {
                navigate('/estudiantes')
                localStorage.setItem('user', JSON.stringify(user.data))
            }
        } catch (error) {
            setErrorLogin(true)
        }
    }

    const person = async () => {
        const response = await axios.get('https://api.escuelajs.co/api/v1/users')
        setUsers(response.data)
        setEstudiantes(response.data.slice(0, itemsByPage))
    }
    const next = () => {
        setEstudiantes(users.slice(itemsByPage, itemsByPage + 10))
        setItemsByPage(itemsByPage + 10)
    }
    const back = () => {
        setEstudiantes(users.slice(itemsByPage-20, itemsByPage-10 ))
        setItemsByPage(itemsByPage - 10)
    }

    const handleDelete = (id) => {
        resetFrom()
        setModalEliminar(true)
        setId(id)
    }

    const deleteUsuarios = async () => {
        await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`)
        setId(null)
        setModalEliminar(false)
    }

    return (
        <EstudianteContex.Provider value={{
            handleForm, form, saveUser, estudiantes, setEstudiantes, handleEdit, resetFrom,
            updateStudent, isEdit, id, setValue, value, login, errorLogin, person,
            successCreateUser, errorLogin, isModalOpen, errores, setErrores, setIsModalOpen
            , modalEliminar, handleDelete, deleteUsuarios, setModalEliminar, updateuser, setErrorLogin
            , next , back , users
        }}>
            {children}
        </EstudianteContex.Provider>
    )
}
