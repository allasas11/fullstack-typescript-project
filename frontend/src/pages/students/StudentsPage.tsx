import React, { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import api from "../../api"
import { Link } from "react-router"

import { Student } from "../../types"

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get("/students")
        setStudents(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    };
    fetchStudents()
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

  if (students.length === 0) {
    return <div>No students found</div>
  }

  return (
    <div>
      <h1>Students Page</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <Link to={`/students/${student._id}`}>{student.name} {student.surname}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentsPage