const express = require('express')
const { getProgrammingLanguages, getProgrammingLanguageById, createProgrammingLanguage, updateProgrammingLanguage, removeProgrammingLanguage } = require('../services/proglangs')

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const data = await getProgrammingLanguages()
        res.send(data)
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const programmingLanguage = await getProgrammingLanguageById(id)
        if (!programmingLanguage) {
            return res.status(404).send({ message: 'Programming language not found' })
        }
        res.send(programmingLanguage);
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.post('/', async (req, res) => {
    const { body } = req

    try {
        const response = await createProgrammingLanguage(body)
        res.status(201).send(response)
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        const response = await updateProgrammingLanguage(body, id)
        if (response.matchedCount === 0) {
            return res.status(404).send({ message: 'Programming language not found' })
        }
        res.send({ message: 'Programming language updated successfully', response })
    } catch (error) {
        res.status(500).send({ error })
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await removeProgrammingLanguage(id)
        if (response.deletedCount === 0) {
            return res.status(404).send({ message: 'Programming language not found' })
        }
        res.send({ message: 'Programming language removed successfully', response })
    } catch (error) {
        res.status(500).send({ error })
    }
})

module.exports = router