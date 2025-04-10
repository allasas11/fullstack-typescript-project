import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { BarLoader } from "react-spinners"

import { Student } from "../../types/types"
import api from "../../api"


const StudentPage: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await api.get<Student>(`/students/${id}`)
        setStudent(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
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

  if (!student) {
    return <div>No student found</div>
  }

  return (
    <div>
      <h1>Student Page</h1>
        <p><strong>Name:</strong> {student.name} {student.surname}</p>
        <p><strong>Age:</strong> {student.age}</p>

        <p>
            Group: <em>{student.groupId?.name || "No group assigned"}</em>
        </p>

        {student.interests.length > 0 ? (
        <div>
            <p>Interests:</p>
            <ul>
            {student.interests.map((language) => (
                <li key={language._id}>
                {language.name}
                </li>
            ))}
            </ul>
        </div>
        ) : (
        <p>No programming language interests.</p>
        )}
    </div>
  )
}

export default StudentPage