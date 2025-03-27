const express = require('express')
const { getSubjects, createSubject, getSubjectById, updateSubject, removeSubject } = require('../services/subjects')
const { getLecturersList } = require('../services/lecturers')
const { getProgrammingLanguages } = require('../services/proglangs')

const router = express.Router()

// ROUTES //

router.get('/subjects', (req, res) => {
    const subjects = getSubjects()

    const data = {
        newSubjectButton: {
            url: '/create-subject',
            title: 'Create subject',
        },
        subjects
    }

    res.render('subjects', data)
})

router.get('/subjects/:id', (req, res) => {
    const { id } = req.params

    const subject = getSubjectById(id)

    if (!subject) {
        return res.render('subject', { subject: null, id })
    }

    const lecturers = getLecturersList()
    const teachingLecturer = lecturers.find(lecturer =>
        lecturer.id === subject.lecturerId
    )

    const progLangs = getProgrammingLanguages()
    const programmingLanguageNames = subject.programmingLanguages.map(langId => {
        const lang = progLangs.find(p => p.id === langId)
        return lang ? lang.name : 'Unknown Language'
    })

    res.render('subject', { subject, id, teachingLecturer, programmingLanguageNames })
})

router.get('/create-subject', (req, res) => {

    const progLangs = getProgrammingLanguages()
    const lecturers = getLecturersList()

    res.render('create-subject', { progLangs, lecturers })
})

router.post('/subject-created', (req, res) => {
    const { body } = req

    console.log('Request Body:', body)

    const createdSubject = createSubject(body)

    res.redirect(`/subjects/${createdSubject.id}`)
})

router.get('/edit-subject/:id', (req, res) => {
    const { id } = req.params

    const subject = getSubjectById(id)

    if (!subject) {
        return res.send('<h1>Subject not found</h1>')
    }

    const progLangs = getProgrammingLanguages()
    const lecturers = getLecturersList()

    res.render('edit-subject', { subject, progLangs, lecturers })
})

router.post('/subject-edited/:id', (req, res) => {
    const { id } = req.params
    const { body } = req

    const updatedSubject = updateSubject({ ...body, id })

    res.redirect(`/subjects/${updatedSubject.id}`)
})

router.post('/delete-subject', (req, res) => {
    const { subjectId } = req.body

    removeSubject(subjectId)

    res.redirect('/subjects')
})

module.exports = router


