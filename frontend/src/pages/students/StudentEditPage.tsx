// src/pages/students/StudentEditPage.tsx
import React, { useEffect, useState } from "react"

import useFetchOptions from "../../hooks/useFetchOptions"
import api from "../../api"
import { useNavigate, useParams } from "react-router"
import { BarLoader } from "react-spinners";

const StudentEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { groups, proglangs, loading } = useFetchOptions()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: 0,
    groupId: "",
    interests: [] as string[]
  })

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`)
        setFormData(response.data)
      } catch (error) {
        console.error("Error fetching student:", error)
      }
    };
    fetchStudent()
  }, [id])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
        ...prevState,
        [name]: value }))
  }

  const handleInterestsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target

    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, interests: [...prevState.interests, value] }
      } else {
        return {
          ...prevState,
          interests: prevState.interests.filter((id) => id !== value),
        }
      }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await api.put(`/students/${id}`, formData)
      navigate("/students")
    } catch (error) {
      console.error("Error updating student:", error)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <BarLoader color="#646cff" loading={true} />
      </div>
    )
  }

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>

        <div className="formControl">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required/>
        </div>

        <div className="formControl">
          <label htmlFor="surname">Surname:</label>
          <input type="text" name="surname" id="name" value={formData.surname} onChange={handleChange} required />
        </div>

        <div className="formControl">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div className="formControl">
          <label htmlFor="groupId">Group:</label>
          <select name="groupId" id="groupId" value={formData.groupId} onChange={handleChange} required >
            <option value="">Select a group</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="formControl">
          <label>Interests:</label>
          <div>
            {proglangs.map((proglang) => (
              <label key={proglang._id}>
                <input type="checkbox" value={proglang._id} checked={formData.interests.includes(proglang._id)} onChange={handleInterestsChange} />
                {proglang.name}
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/students")}>Cancel</button>
        
      </form>
    </div>
  )
}

export default StudentEditPage