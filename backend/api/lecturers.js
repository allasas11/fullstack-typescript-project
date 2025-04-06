const express = require('express')
const { getLecturers, getLecturerById, createLecturer, updateLecturer, removeLecturer } = require('../controllers/lecturerController')


const router = express.Router()

router.get('/', getLecturers )
router.get('/:id', getLecturerById)
router.post('/', createLecturer)
router.put('/:id', updateLecturer)
router.delete('/:id', removeLecturer)

module.exports = router