const express = require('express')

const { getGroups, getGroupById, createGroup, updateGroup, removeGroup } = require('../services/groups')

const router = express.Router()

router.get('/', (req, res) => {
    const groups = getGroups()
    res.send(groups)
})


router.get('/:id', (req, res) => {
    const { id } = req.params
    const group = getGroupById(id, req.query)

    if (!group) {
        return res.status(404).send({ message: 'Group not found' })
    }

    res.send(group)
});


router.post('/', (req, res) => {
    const { body } = req

    if (!body.name) {
        return res.status(400).send({ message: 'Group name is required' })
    }

    const createdGroup = createGroup(body)
    res.status(201).send(createdGroup)
})


router.put('/:id', (req, res) => {
    const { id } = req.params
    const { body } = req

    const updatedGroup = updateGroup({ ...body, id })

    if (!updatedGroup) {
        return res.status(404).send({ message: 'Group not found' })
    }

    res.send(updatedGroup)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    removeGroup(id)

    res.send({ message: 'Group was successfully removed', id })
})

module.exports = router