import React, { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import api from "../../api";
import { Link } from "react-router"

import { Lecturer } from "../../types"

const LecturersPage: React.FC = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const { data } = await api.get("/lecturers")
        setLecturers(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }
    fetchLecturers()
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

  if (lecturers.length === 0) {
    return <div>No lecturers found</div>
  }

  return (
    <div>
      <h1>Lecturers Page</h1>
      <ul>
        {lecturers.map((lecturer) => (
          <li key={lecturer._id}>
            <Link to={`/lecturers/${lecturer._id}`}>
              {lecturer.name} {lecturer.surname}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LecturersPage