const express = require('express')
const { getSubjects, getSubjectById, createSubject, updateSubject, removeSubject } = require('../controllers/subjectController')
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getSubjects) 
router.get('/:id', authMiddleWare, getSubjectById)
router.post('/', authMiddleWare, createSubject)
router.put('/:id', authMiddleWare, updateSubject)
router.delete('/:id', authMiddleWare, removeSubject)

module.exports = router