const express = require('express')
const { getLecturers, getLecturerById, createLecturer, updateLecturer, removeLecturer } = require('../controllers/lecturerController')
const authMiddleWare = require('../middlewares/authMiddleware')


const router = express.Router()

router.get('/', getLecturers )
router.get('/:id', authMiddleWare, getLecturerById)
router.post('/', authMiddleWare, createLecturer)
router.put('/:id', authMiddleWare, updateLecturer)
router.delete('/:id', authMiddleWare, removeLecturer)

module.exports = router