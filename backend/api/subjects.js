const express = require('express')
const { getSubjects, getSubjectById, createSubject, updateSubject, removeSubject } = require('../services/subjects')
const router = express.Router()


router.get('/', (req, res) => {
  try {
    const subjects = getSubjects()
    res.send(subjects)
  } catch (error) {
    console.error("Error fetching subjects:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})


router.get('/:id', (req, res) => {
  const { id } = req.params

  try {
    const subject = getSubjectById(id)

    if (!subject) {
      return res.status(404).send({ message: 'Subject not found' })
    }

    res.send(subject)
  } catch (error) {
    console.error("Error fetching subject:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})


router.post('/', (req, res) => {
  const { body } = req

  try {
    if (!body.name || !body.description || !body.lecturerId) {
      return res.status(400).send({ message: 'Name, description, and lecturerId are required fields' })
    }

    const createdSubject = createSubject(body)
    res.status(201).send(createdSubject)
  } catch (error) {
    console.error("Error creating subject:", error)
    res.status(400).send({ message: error.message || "Bad Request" })
  }
})


router.put('/:id', (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const updatedSubject = updateSubject({ ...body, id })

    if (!updatedSubject) {
      return res.status(404).send({ message: 'Subject not found' })
    }

    res.send(updatedSubject)
  } catch (error) {
    console.error("Error updating subject:", error)
    res.status(400).send({ message: error.message || "Bad Request" })
  }
})


router.delete('/:id', (req, res) => {
  const { id } = req.params

  try {
    removeSubject(id)
    res.send({ message: 'Subject was successfully removed', id })
  } catch (error) {
    console.error("Error deleting subject:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})

module.exports = router