const express = require('express')
const { getStudents, getStudentById, createStudent, updateStudent, removeStudent } = require('../controllers/studentController')
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getStudents)
router.get('/:id', authMiddleWare, getStudentById)
router.post('/', authMiddleWare, createStudent)
router.put('/:id', authMiddleWare, updateStudent)
router.delete('/:id', authMiddleWare, removeStudent)


module.exports = router

