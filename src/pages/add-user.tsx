import axios from 'axios'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

interface IFormInputs {
    name: string
    surname: string
    age: number
    salary: number
}

export const AddUser = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>()

    const onSubmit = async (data: IFormInputs) => {
        await axios.post("http://localhost:3008/users", data)
        navigate("/")
    }

    return <div className='add-edit-user'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Add User</h2>

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

            <button type="submit">Create</button>
        </form>
    </div>

}
