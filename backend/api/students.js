const express = require('express')

const { getStudents, getStudentById, createStudent, updateStudent, removeStudent } = require('../services/students')

const router = express.Router()

// API //

router.get('/', async (req, res) => {
    try {
        const data = await getStudents()
        res.send(data)
    } catch(error) {
        res.status(500).send({error})
    }

})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const student = await getStudentById(id)
        res.send(student)
    } catch(error) {
        res.status(500).send({error})
    }
})

router.post('/', async (req, res) => {
    const { body } = req

    try {
        const response = await createStudent(body)
        res.send(response)
    } catch(error) {
        res.status(500).send({error})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        const response = await updateStudent({ ...body, id})
        res.send(response)
    } catch(error) {
        res.status(500).send({error})
    }

})

router.delete('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const response = await removeStudent(id)
        res.send({ message: 'Student data object was successfully removed', id, response })
    } catch(error) {
        res.status(500).send({error})

    }
})


module.exports = router

