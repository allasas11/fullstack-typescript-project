
import React, { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import api from "../../api"
import { Link } from "react-router"

import { Subject } from "../../types"

const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await api.get("/subjects")
        setSubjects(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    };
    fetchSubjects()
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

  if (subjects.length === 0) {
    return <div>No subjects found</div>
  }

  return (
    <div>
      <h1>Subjects Page</h1>
      <ul>
        {subjects.map((subject) => (
          <li key={subject._id}>
            <Link to={`/subjects/${subject._id}`}>{subject.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SubjectsPage