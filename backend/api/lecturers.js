const express = require('express')
const {getLecturersList, getLecturerById, createLecturer, updateLecturer, removeLecturer } = require('../services/lecturers')
const router = express.Router()


router.get('/', (req, res) => {
  try {
    const lecturers = getLecturersList()
    res.send(lecturers)
  } catch (error) {
    console.error("Error fetching lecturers:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  try {
    const lecturer = getLecturerById(id)

    if (!lecturer) {
      return res.status(404).send({ message: 'Lecturer not found' })
    }

    res.send(lecturer)
  } catch (error) {
    console.error("Error fetching lecturer:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})

router.post('/', (req, res) => {
  const { body } = req

  try {
    if (!body.name || !body.surname || !body.age) {
      return res.status(400).send({ message: 'Name, surname, and age are required fields' })
    }

    const createdLecturer = createLecturer(body)

    res.status(201).send(createdLecturer)

  } catch (error) {
    console.error("Error creating lecturer:", error)
    res.status(400).send({ message: error.message || "Bad Request" })
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const updatedLecturer = updateLecturer({ ...body, id })

    if (!updatedLecturer) {
      return res.status(404).send({ message: 'Lecturer not found' })
    }

    res.send(updatedLecturer)
  } catch (error) {
    console.error("Error updating lecturer:", error)
    res.status(400).send({ message: error.message || "Bad Request" })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  try {
    removeLecturer(id)
    res.send({ message: 'Lecturer was successfully removed', id })
  } catch (error) {
    console.error("Error deleting lecturer:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})

module.exports = router