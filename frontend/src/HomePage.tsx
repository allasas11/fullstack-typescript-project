import { useEffect, useState } from "react"
import { API_URL } from "./utils/config"
import { BarLoader } from "react-spinners"
import { Student, Group, ProgrammingLanguage, Lecturer, Subject } from "./types/types"


function HomePage() {

  const [students, setStudents] = useState<Student[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [proglangs, setProglangs] = useState<ProgrammingLanguage[]>([])
  const [lecturers, setLecturers] = useState<Lecturer[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])


  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true)

        const studentsResponse = await fetch(`${API_URL}/students`)
        if (!studentsResponse.ok) {
          throw new Error("Failed to fetch students")
        }
        const data = await studentsResponse.json()
        setStudents(data)


        const groupsResponse = await fetch(`${API_URL}/groups`)
        if (!groupsResponse.ok) {
          throw new Error("Failed to fetch groups")
        }
        const groupsData = await groupsResponse.json()
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

        setLoading(false)
      } catch (err) {
        console.error("Error fetching students:", (err as Error).message)
        setError((err as Error).message || "An error occurred while fetching data.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])



    if (loading) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <BarLoader color="#646cff" loading={true} />
        </div>
      )
    }
  
    if (error) {
      return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;
    }



  return (

    <>

      <section>
        <h2>Students:</h2>

        <ol>
          {students.map(student => (
            <li key={student._id}>

              <a href={`/students/${student._id}`}>
                {student.name} {student.surname}, {student.age} y.
              </a>

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

            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>Groups:</h2>
        <ul>
          {groups.map((group) => (
            <li key={group._id}>

              <a href={`/groups/${group._id}`}>
                <strong>{group.name}</strong> - {group.description}
              </a>

              {group.students.length > 0 ? (
                <div>
                  <h4>Students:</h4>
                  <ul>
                    {group.students.map((student) => (
                        <li key={student._id}>
                          {student.name} {student.surname}, {student.age} y.
                        </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No students in this group.</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Programming Languages:</h2>

        <ul>
          {proglangs.map((proglang) => (
            <li key={proglang._id}>
              <a href={`/proglangs/${proglang._id}`}>
                <strong>{proglang.name}</strong> - {proglang.description}
              </a>

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
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Lecturers:</h2>

        <ul>
          {lecturers.map((lecturer) => (
            <li key={lecturer._id}>
              <a href={`/lecturers/${lecturer._id}`}>
                <strong>{lecturer.name} {lecturer.surname}</strong> - Age: {lecturer.age}
              </a>

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

              {lecturer.groups.length > 0 && (
                <div>
                  <h4>Groups Assigned:</h4>
                  <ul>
                    {lecturer.groups.map((group) => (
                      <li key={group._id}>
                        {group.name} - {group.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Subjects:</h2>
        <ul>
          {subjects.map(subject => (
            <li key={subject._id}>
              <a href={`/subjects/${subject._id}`}>
                <strong>{subject.name}</strong> - {subject.description}
              </a>
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
            </li>
          ))}
        </ul>
      </section>

    </>
  )
}

export default HomePage
