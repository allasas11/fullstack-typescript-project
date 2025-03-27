const express = require('express')
const {getProgrammingLanguages, getProgrammingLanguageById, createProgrammingLanguage, updateProgrammingLanguage, removeProgrammingLanguage } = require('../services/proglangs')
const router = express.Router()


router.get('/', (req, res) => {
  try {
    const programmingLanguages = getProgrammingLanguages()
    res.send(programmingLanguages)
  } catch (error) {
    console.error("Error fetching programming languages:", error);
    res.status(500).send({ message: "Internal Server Error" })
  }
})


router.get('/:id', (req, res) => {
  const { id } = req.params

  try {
    const programmingLanguage = getProgrammingLanguageById(id)

    if (!programmingLanguage) {
      return res.status(404).send({ message: 'Programming language not found' })
    }

    res.send(programmingLanguage)
  } catch (error) {
    console.error("Error fetching programming language:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})


router.post('/', (req, res) => {
  const { body } = req

  try {
    if (!body.name) {
      return res.status(400).send({ message: 'Programming language name is required' })
    }

    const createdProgrammingLanguage = createProgrammingLanguage(body)
    res.status(201).send(createdProgrammingLanguage)
  } catch (error) {
    console.error("Error creating programming language:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
});


router.put('/:id', (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const updatedProgrammingLanguage = updateProgrammingLanguage({ ...body, id })

    if (!updatedProgrammingLanguage) {
      return res.status(404).send({ message: 'Programming language not found' })
    }

    res.send(updatedProgrammingLanguage)
  } catch (error) {
    console.error("Error updating programming language:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})


router.delete('/:id', (req, res) => {
  const { id } = req.params

  try {
    removeProgrammingLanguage(id)
    res.send({ message: 'Programming language was successfully removed', id })
  } catch (error) {
    console.error("Error deleting programming language:", error)
    res.status(500).send({ message: "Internal Server Error" })
  }
})


module.exports = router