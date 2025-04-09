import React, { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import { useParams } from "react-router"
import api from "../../api"

import { Subject } from "../../types"

const SubjectPage: React.FC = () => {
  const [subject, setSubject] = useState<Subject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const { data } = await api.get<Subject>(`/subjects/${id}`)
        setSubject(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }
    fetchSubject()
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

  if (!subject) {
    return <div>No subject found</div>
  }

  return (
    <div>
        <h1>Subject Page</h1>
        <p><strong>Name:</strong> {subject.name}</p>
        <p><strong>Description:</strong> {subject.description}</p>
        <p>Programming Languages:</p>
        <ul>
        {subject.proglangs.length > 0 ? (
            subject.proglangs.map((proglang) => (
            <li key={proglang._id}>
                {proglang.name}
            </li>
            ))
        ) : (
            <li>No programming languages assigned.</li>
        )}
        </ul>
    </div>
  )
}

export default SubjectPage
