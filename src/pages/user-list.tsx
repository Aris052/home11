import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

interface IUser {
    id: number | string
    name: string
    surname: string
    age: number
    salary: number
}

export const UserList = () => {
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get("http://localhost:3008/users")
            setUsers(response.data)
        }
        fetchUsers()
    })

    const deleteUser = async (id: number | string) => {
        await axios.delete(`http://localhost:3008/users/${id}`)
        setUsers(users.filter(user => user.id != id))
    }


    return <div>
        <h2>User List</h2>
        {
            users.map(user =>
                <div className='users-div' key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.surname}</p>
                    <p>{user.age}</p>
                    <p>{user.salary}</p>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                    <Link to={"/user/" + user.id}><button>Edit</button></Link>
                </div>)
        }
    </div>
}
