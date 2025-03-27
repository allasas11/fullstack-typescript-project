const express = require('express')
const { getGroups, getGroupById, createGroup, updateGroup, removeGroup } = require('../services/groups')
const { getStudents } = require('../services/students')

const router = express.Router()


// ROUTES //

router.get('/groups', (req, res) => {
    const groups = getGroups()

    const data = {
        newGroupButton: {
            url: '/create-group',
            title: 'Create group'
        },
        groups
    }

    res.render('groups', data)
})


router.get('/groups/:id', (req, res) => {
    const { id } = req.params

    const group = getGroupById(id)

    if (!group) {
        return res.render('group', { group: null, id })
    }

    const students = getStudents()

    const assignedStudents = students.filter(student => group.students.includes(student.id))

    res.render('group', { group, id, assignedStudents })
})


router.get('/create-group', (req, res) => {
        const students = getStudents()
        res.render('create-group', { students })
})


router.post('/group-created', (req, res) => {

    const { body } = req

    const createdGroup = createGroup(body)

    res.redirect(`/groups/${createdGroup.id}`)
})


router.get('/edit-group/:id', (req, res) => {
    const { id } = req.params

    const group = getGroupById(id)

    if (!group) {
        return res.send('<h1>Group not found</h1>')
    }

    const students = getStudents()

    res.render('edit-group', { group, students })
});


router.post('/group-edited/:id', (req, res) => {
    const { id } = req.params
    const { body } = req

    const updatedGroup = updateGroup({ ...body, id })

    res.redirect(`/groups/${updatedGroup.id}`)
});


router.post('/delete-group', (req, res) => {
    const { groupId } = req.body

    removeGroup(groupId)

    res.redirect('/groups')
})


module.exports = router