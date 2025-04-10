import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { BarLoader } from "react-spinners"

import { Student } from "../../types/types"
import api from "../../api"


const StudentPage: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return
    }

    try {
      await api.delete(`/students/${id}`)
      navigate("/students")
    } catch (error) {
      console.error("Error deleting student:", error)
    }
  }

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

      <div>
        <button onClick={() => navigate(`/students/edit/${id}`)}>Edit</button>
        <button onClick={handleDelete} >Delete</button>
      </div>
    </div>
  )
}

export default StudentPage