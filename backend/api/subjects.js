const express = require('express')
const { getSubjects, getSubjectById, createSubject, updateSubject, removeSubject } = require('../services/subjects')

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const data = await getSubjects()
        res.send(data)
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const subject = await getSubjectById(id)
        if (!subject) {
            return res.status(404).send({ message: 'Subject not found' })
        }
        res.send(subject)
    } catch (error) {
        res.status(500).send({ error })
    }
});


router.post('/', async (req, res) => {
    const { body } = req

    try {
        const response = await createSubject(body)
        res.status(201).send(response)
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        const response = await updateSubject(body, id)
        if (response.matchedCount === 0) {
            return res.status(404).send({ message: 'Subject not found' })
        }
        res.send({ message: 'Subject updated successfully', response })
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await removeSubject(id)
        if (response.deletedCount === 0) {
            return res.status(404).send({ message: 'Subject not found' })
        }
        res.send({ message: 'Subject removed successfully', response })
    } catch (error) {
        res.status(500).send({ error })
    }
})

module.exports = router