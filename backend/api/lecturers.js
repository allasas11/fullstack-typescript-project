const express = require('express')
const { getLecturers, getLecturerById, createLecturer, updateLecturer, removeLecturer, getGroupsByLecturer, getStudentsByLecturer, getSubjectsByLecturer } = require('../services/lecturers')

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const data = await getLecturers()
        res.send(data)
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const lecturer = await getLecturerById(id)
        if (!lecturer) {
            return res.status(404).send({ message: 'Lecturer not found' })
        }
        res.send(lecturer)
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.post('/', async (req, res) => {
    const { body } = req

    try {
        const response = await createLecturer(body)
        res.status(201).send(response)
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        const response = await updateLecturer(body, id)
        if (response.matchedCount === 0) {
            return res.status(404).send({ message: 'Lecturer not found' })
        }
        res.send({ message: 'Lecturer updated successfully', response })
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await removeLecturer(id)
        if (response.deletedCount === 0) {
            return res.status(404).send({ message: 'Lecturer not found' })
        }
        res.send({ message: 'Lecturer removed successfully', response })
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.get("/:lector/groups", async (req, res) => {
    try {
      const { lector } = req.params
      const groups = await getGroupsByLecturer(lector)
  
      if (groups.length === 0) {
        return res.status(404).send({ message: "No groups found for this lecturer." })
      }
  
      res.send(groups)

    } catch (error) {
      console.error("Error fetching groups:", error)
      res.status(500).send({ error: error.message })
    }
  })

router.get("/:lector/students", async (req, res) => {
try {
    const { lector } = req.params
    const students = await getStudentsByLecturer(lector)

    if (students.length === 0) {
    return res.status(404).send({ message: "No students found for this lecturer." })
    }

    res.send(students)

} catch (error) {
    console.error("Error fetching students:", error)
    res.status(500).send({ error: error.message })
}
})


router.get("/:lector/subjects", async (req, res) => {
    try {
      const { lector } = req.params
      const subjects = await getSubjectsByLecturer(lector)
  
      if (subjects.length === 0) {
        return res.status(404).send({ message: "No subjects found for this lecturer." })
      }
  
      res.send(subjects)

    } catch (error) {
      console.error("Error fetching subjects:", error)
      res.status(500).send({ error: error.message })
    }
  })



module.exports = router