const express = require('express')

const { getStudents, getStudentById, createStudent, updateStudent, removeStudent } = require('../services/students')
const { getProgrammingLanguages } = require('../services/proglangs')

const router = express.Router()


// STUDENTS // 

router.get('/students', (req, res) => {

    const start = parseInt(req.query._start ?? '0', 10)
    const limit = parseInt(req.query._limit ?? '5', 10)

    const students = getStudents({ _start: start, _limit: limit })

    const nextPage = `/students?_start=${start + limit}&_limit=${limit}`
    const prevPage = start > 0 ? `/students?_start=${start - limit}&_limit=${limit}` : null

    const data = {
        newStudentButton: {
            url: '/create-student',
            title: 'Create student'
        },
        students,
        limit: req.query._limit ?? '5',
        nextPage,
        prevPage
    }

    res.render('students', data)
})

router.get('/students/:id', (req, res) => {
    const { id } = req.params

    const student = getStudentById(id)

    res.render('student', {student, id})

})

router.get('/create-student', (req, res) => {

    const progLangs = getProgrammingLanguages()

    res.render('create-student', { progLangs })
})

router.post('/student-created', (req, res) => {
    const { body } = req

    const createdStudent = createStudent(body)

    res.redirect(`/students/${createdStudent.id}`)
})

router.get('/edit-student/:id', (req, res) => {

    const { id } = req.params

    const student = getStudentById(id)

    if (!student) {
        return res.send("<h1>Student not found</h1><a href='/students'>Back to list</a>");
    }

    const progLangs = getProgrammingLanguages()

    res.render('edit-student', {student, id, progLangs})
})

router.post('/student-edited', (req, res) => {
    const { body } = req

    const updatedStudent = updateStudent(body)

    res.redirect(`/students/${updatedStudent.id}`)

})

router.post('/delete-student/', (req, res) => {
    const { studentId } = req.body

    removeStudent(studentId) 

    res.redirect('/students')
})



module.exports = router
