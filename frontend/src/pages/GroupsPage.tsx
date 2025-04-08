import React, { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import { Link } from "react-router"
import api from "../api"


interface Group {
    _id: string
    name: string
}

const GroupsPage: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const { data } = await api.get('/groups')
                console.log(data)
                setGroups(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error)
                } else {
                    setError(new Error("An unknown error occurred"))
                }
            } finally {
                setLoading(false)
            }
        }
        fetchGroups()
    }, [])

    if (loading) {
        return (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <BarLoader color="#646cff" loading={true} />
          </div>
        )
      }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (groups.length === 0) {
        return <div>No groups found</div>
    }

    return (
        <div>
            <h1>Groups Page</h1>
            <ul>
                {groups.map(group => (
                    <li key={group._id}>
                        <Link to={`/groups/${group._id}`}>{group.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GroupsPage