import { useEffect, useState } from "react"
import { API_URL } from "./utils/config"

interface Student {
  name: string
  surname: string
  age: number
  interests: string[]
  id: string
}


interface Group {
  id: string
  name: string
  description: string
  students: string[]
}


interface ProgrammingLanguage {
  id: string
  name: string
  description: string
  students: string[]
}

interface Lecturer {
  id: string
  name: string
  surname: string
  age: number
  subjectIds: string[]
  groupIds: string[]
}


interface Subject {
  id: string
  name: string
  description: string
  programmingLanguages: string[]
  lecturerId: string
}


function App() {

  const [students, setStudents] = useState<Student[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [proglangs, setProglangs] = useState<ProgrammingLanguage[]>([])
  const [lecturers, setLecturers] = useState<Lecturer[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/students`)
        const data = await response.json()
        console.log(data)
        setStudents(data)


        const groupsResponse = await fetch(`${API_URL}/groups`)
        const groupsData = await groupsResponse.json()
        setGroups(groupsData)


        const proglangsResponse = await fetch(`${API_URL}/proglangs`)
        if (!proglangsResponse.ok) {
          throw new Error(`Failed to fetch programming languages: ${proglangsResponse.status}`)
        }
        const proglangsData = await proglangsResponse.json()
        setProglangs(proglangsData);


        const lecturersResponse = await fetch(`${API_URL}/lecturers`)
        if (!lecturersResponse.ok) {
          throw new Error(`Failed to fetch lecturers: ${lecturersResponse.status}`)
        }
        const lecturersData = await lecturersResponse.json()
        setLecturers(lecturersData)


        const subjectsResponse = await fetch(`${API_URL}/subjects`)
        if (!subjectsResponse.ok) {
          throw new Error(`Failed to fetch subjects: ${subjectsResponse.status}`)
        }
        const subjectsData = await subjectsResponse.json()
        setSubjects(subjectsData)

      } catch (error) {
        console.error("Error fetching students:", error)
      }
    }

    fetchData()
  }, [])
  
  return (

    <>

    <div>
      <h2>Students:</h2>

      <ol>
        {students.map(student => (
          <a href={`/students/${student.id}`}>
            <li key={student.id}>{student.name} {student.surname}, {student.age} y.</li>
          </a>
        ))}
      </ol>
    </div>

    <div>
      <h2>Groups:</h2>

      <ul>
        {groups.map(group => (
          <a href={`/groups/${group.id}`} key={group.id}>
            <li><strong>{group.name}</strong> - {group.description}</li>
          </a>
        ))}
      </ul>
    </div>

    <div>
      <h2>Programming Languages:</h2>

      <ul>
        {proglangs.map(proglang => (
          <a href={`/proglangs/${proglang.id}`} key={proglang.id}>
            <li>
              <strong>{proglang.name}</strong> - {proglang.description}
            </li>
          </a>
        ))}
      </ul>
    </div>


    <div>
      <h2>Lecturers:</h2>

      <ul>
        {lecturers.map(lecturer => (
          <a href={`/lecturers/${lecturer.id}`} key={lecturer.id}>
            <li>
              <strong>{lecturer.name} {lecturer.surname}</strong> - Age: {lecturer.age}
            </li>
          </a>
        ))}
      </ul>
    </div>


    <div>
      <h2>Subjects:</h2>

      <ul>
        {subjects.map(subject => (
          <a href={`/subjects/${subject.id}`} key={subject.id}>
            <li>
              <strong>{subject.name}</strong> - {subject.description}
            </li>
          </a>
        ))}
      </ul>
    </div>

    </>
  )
}

export default App
