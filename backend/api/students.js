const express = require('express')
const { getStudents, getStudentById, createStudent, updateStudent, removeStudent } = require('../controllers/studentController')

const router = express.Router()

router.get('/', getStudents)
router.get('/:id', getStudentById)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', removeStudent)


module.exports = router

