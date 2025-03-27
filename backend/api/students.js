const express = require('express')

const { getStudents, getStudentById, createStudent, updateStudent, removeStudent } = require('../services/students')

const router = express.Router()

// API //

router.get('/', (req, res) => {
    
    const students = getStudents(req.query)
    res.send(students)
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    const student = getStudentById(id)

    res.send(student)
})

router.post('/', (req, res) => {
    const { body } = req
    const createdStudent = createStudent(body)
    res.send(createdStudent)
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { body } = req

    const updatedStudent = updateStudent({ ...body, id})

    res.send(updatedStudent)
})

router.delete('/:id', (req, res) => {

    const { id } = req.params

    removeStudent(id) 

    res.send({ message: 'Student data object was successfully removed', id })
})


module.exports = router

