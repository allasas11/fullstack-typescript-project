import React, { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import { useParams } from "react-router"
import api from "../../api"

import { ProgrammingLanguage } from "../../types"

const ProglangPage: React.FC = () => {
  const [proglang, setProglang] = useState<ProgrammingLanguage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchProglang = async () => {
      try {
        const { data } = await api.get<ProgrammingLanguage>(`/proglangs/${id}`)
        setProglang(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }
    fetchProglang()
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

  if (!proglang) {
    return <div>No programming language found</div>
  }

  return (
    <div>
        <h1>Programming Language Page</h1>
        <p><strong>Name:</strong> {proglang.name}</p>
        <p><strong>Description:</strong> {proglang.description}</p>

        {proglang.students.length > 0 && (
            <ul>
                <h4>Students Interested:</h4>
                {proglang.students.map((student) => (
                <li key={student._id}>
                    {student.name} {student.surname}.
                </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default ProglangPage