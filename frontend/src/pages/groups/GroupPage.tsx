import React, { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import { useParams } from "react-router"
import api from "../../api"

import { Group } from "../../types"

const GroupPage: React.FC = () => {

    const [group, setGroup] = useState<Group | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const { data } = await api.get<Group>(`/groups/${id}`)
                console.log("🚀 ~ fetchGroup ~ data:", data)
                setGroup(data)
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
        fetchGroup()
    }, [id])

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

    if (!group) {
        return <div>No group found</div>
    }

    return (
        <div>
            <h1>Group Page</h1>

            <p><strong>Name:</strong> {group.name}</p>
            <p><strong>Description:</strong> {group.description}</p>

            {group.students.length > 0 ? (
                <div>
                  <h4>Students:</h4>
                  <ul>
                    {group.students.map((student) => (
                        <li key={student._id}>
                          {student.name} {student.surname}, {student.age} y.o.
                        </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No students in this group.</p>
              )}
        </div>
    )
}

export default GroupPage