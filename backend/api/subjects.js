const express = require('express')
const { getSubjects, getSubjectById, createSubject, updateSubject, removeSubject } = require('../controllers/subjectController')

const router = express.Router()

router.get('/', getSubjects)
router.get('/:id', getSubjectById)
router.post('/', createSubject)
router.put('/:id', updateSubject)
router.delete('/:id', removeSubject)

module.exports = router