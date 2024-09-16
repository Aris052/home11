import axios from 'axios'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

interface IFormInputs {
    name: string
    surname: string
    age: number
    salary: number
}

export const User = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputs>()

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:3008/users/${id}`)
            const user = response.data
            setValue("name", user.name)
            setValue("surname", user.surname)
            setValue("age", user.age)
            setValue("salary", user.salary)
        }
        fetchUser()
    }, [id, setValue])

    const onSubmit = async (data: IFormInputs) => {
        await axios.put(`http://localhost:3008/users/${id}`, data)
        navigate("/")
    }

    return (
        <div className='add-edit-user'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Edit User</h2>

                <label>Name:</label>
                <input {...register("name", { required: "Name is required" })} />
                {errors.name && <p>{errors.name.message}</p>}

                <br />

                <label>Surname:</label>
                <input {...register("surname", { required: "Surname is required" })} />
                {errors.surname && <p>{errors.surname.message}</p>}

                <br />

                <label>Age:</label>
                <input type="number" {...register("age", { required: "Age is required", valueAsNumber: true })} />
                {errors.age && <p>{errors.age.message}</p>}

                <br />

                <label>Salary:</label>
                <input type="number" {...register("salary", { required: "Salary is required", valueAsNumber: true })} />
                {errors.salary && <p>{errors.salary.message}</p>}

                <br />

                <button type="submit">Edit</button>
            </form>
        </div>
    )
}