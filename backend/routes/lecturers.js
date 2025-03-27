const express = require('express')

const { getLecturersList, getLecturerById, createLecturer, updateLecturer, removeLecturer } = require('../services/lecturers')
const { getGroups } = require('../services/groups');
const { getSubjects } = require('../services/subjects');

const router = express.Router()

// LECTURERS //

router.get('/lecturers', (req, res) => {
    const lecturers = getLecturersList()
    console.log('Rendering lecturers:', lecturers)

    const data = {
        newLecturerButton: {
            url: '/create-lecturer',
            title: 'Create lecturer'
        },
        lecturers
    }

    res.render('lecturers', data)
})

router.get('/lecturers/:id', (req, res) => {
    const { id } = req.params;

    const lecturer = getLecturerById(id);

    if (!lecturer) {
        return res.send("<h1>Lecturer not found</h1><a href='/lecturers'>Back to list</a>");
    }

    const groups = getGroups()
    const groupNames = lecturer.groupIds.map(groupId => {
        const group = groups.find(g => g.id === groupId)
        return group ? group.name : 'Unknown Group'
    });


    const subjects = getSubjects();
    const subjectNames = lecturer.subjectIds.map(subjectId => {
        const subject = subjects.find(s => s.id === subjectId)
        return subject ? subject.name : 'Unknown Subject'
    })

    res.render('lecturer', { lecturer, id, groupNames, subjectNames })
})

router.get('/create-lecturer', (req, res) => {
    const subjects = getSubjects()
    const groups = getGroups()

    res.render('create-lecturer', { groups, subjects })
})

router.post('/lecturer-created', (req, res) => {
    const { body } = req

    const createdLecturer = createLecturer(body)

    res.redirect(`/lecturers/${createdLecturer.id}`)
})

router.get('/edit-lecturer/:id', (req, res) => {
    const { id } = req.params

    const lecturer = getLecturerById(id)

    if (!lecturer) {
        return res.send("<h1>Lecturer not found</h1><a href='/lecturers'>Back to list</a>");
    }

    const subjects = getSubjects()
    const groups = getGroups()

    res.render('edit-lecturer', { lecturer, id, groups, subjects })
})

router.post('/lecturer-edited', (req, res) => {
    const { body } = req;

    const updatedLecturer = updateLecturer(body)

    res.redirect(`/lecturers/${updatedLecturer.id}`)
})

router.post('/delete-lecturer', (req, res) => {
    const { lecturerId } = req.body

    removeLecturer(lecturerId)

    res.redirect('/lecturers')
})


module.exports = router