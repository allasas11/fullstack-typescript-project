import { useEffect, useState } from "react"
import { API_URL } from "./utils/config"
import { BarLoader } from "react-spinners"

interface Student {
  _id: string;
  name: string
  surname: string
  age: number
  interests: string[]
}


interface Group {
  _id: string
  name: string
  description: string
  students: Student[]
}


interface ProgrammingLanguage {
  _id: string
  name: string
  description: string
  students: string[]
}

interface Lecturer {
  _id: string
  name: string
  surname: string
  age: number
  subjectIds: string[]
  groupIds: string[]
}


interface Subject {
  _id: string
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
  const [subjects, setSubjects] = useState<Subject[]>([])

  const [groupStudents, setGroupStudents] = useState<Student[]>([])
  const [loadingGroupId, setLoadingGroupId] = useState<string | null>(null);

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/students`)
        const data = await response.json()
        setStudents(data)


        const groupsResponse = await fetch(`${API_URL}/groups`)
        const groupsData = await groupsResponse.json()
        console.log("Fetched groups:", groupsData);
        setGroups(groupsData)


        const proglangsResponse = await fetch(`${API_URL}/proglangs`)
        if (!proglangsResponse.ok) {
          throw new Error(`Failed to fetch programming languages: ${proglangsResponse.status}`)
        }
        const proglangsData = await proglangsResponse.json()
        setProglangs(proglangsData)


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



  const fetchGroupStudents = async (groupId: string ) => {
    if (groupId === selectedGroupId) {
      setSelectedGroupId(null)
      setGroupStudents([])
      return
    }

    setLoadingGroupId(groupId)

    try {
      const response = await fetch(`${API_URL}/groups/${groupId}/students`)
      if (!response.ok) {
        throw new Error(`Failed to fetch students for group: ${groupId}`)
      }
      const data = await response.json()

      setSelectedGroupId(groupId)
      setGroupStudents(data.students)
    } catch (error) {
      console.error("Error fetching group students:", error)
    } finally {
      setLoadingGroupId(null)
    }
  }




  return (

    <>

      <div>
        <h2>Students:</h2>

        <ol>
          {students.map(student => (
            <li key={student._id}>
              <a href={`/students/${student._id}`}>
                {student.name} {student.surname}, {student.age} y.
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2>Groups:</h2>
        <ul>
          {groups.map((group) => (
            <li key={group._id}>
              <button
                onClick={() => fetchGroupStudents(group._id)}
                style={{
                  fontWeight: selectedGroupId === group._id ? "bold" : "normal",
                  backgroundColor: selectedGroupId === group._id ? "#646cff" : "transparent",
                }}
              >
                <strong>{group.name}</strong> - {group.description}
              </button>

              {loadingGroupId === group._id && (
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '25px' }}>
                  <BarLoader color="#646cff" loading={true} />
                </div>
              )}

              {selectedGroupId === group._id && (
                <ul>
                  <h4>Students:</h4>
                  {groupStudents.map((student) => (
                    <li key={student._id}>
                      {student.name} {student.surname}, {student.age} y.
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Programming Languages:</h2>

        <ul>
          {proglangs.map(proglang => (
            <li key={proglang._id}>
              <a href={`/proglangs/${proglang._id}`}>
                <strong>{proglang.name}</strong> - {proglang.description}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Lecturers:</h2>

        <ul>
          {lecturers.map(lecturer => (
            <li key={lecturer._id}>
              <a href={`/lecturers/${lecturer._id}`}>
                <strong>{lecturer.name} {lecturer.surname}</strong> - Age: {lecturer.age}
              </a>
            </li>
          ))}
        </ul>
      </div>


      <div>
        <h2>Subjects:</h2>
        <ul>
          {subjects.map(subject => (
            <li key={subject._id}>
              <a href={`/subjects/${subject._id}`}>
                <strong>{subject.name}</strong> - {subject.description}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </>
  )
}

export default App
