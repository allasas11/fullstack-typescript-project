import React, { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"

import { Lecturer } from "../../types/types"
import { useParams } from "react-router"
import api from "../../api";


const LecturerPage: React.FC = () => {
  const [lecturer, setLecturer] = useState<Lecturer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const { data } = await api.get<Lecturer>(`/lecturers/${id}`)
        setLecturer(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }
    fetchLecturer()
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

  if (!lecturer) {
    return <div>No lecturer found</div>
  }

  return (
    <div>

        <h1>Lecturer Page</h1>

        <strong>{lecturer.name} {lecturer.surname}</strong> - Age: {lecturer.age}

        {lecturer.subjects.length > 0 && (
            <div>
                <h4>Subjects Taught:</h4>
                <ul>
                {lecturer.subjects.map((subject) => (
                    <li key={subject._id}>
                    {subject.name} - {subject.description}
                    </li>
                ))}
                </ul>
            </div>
        )}

    </div>
  )
}

export default LecturerPage