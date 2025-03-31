const express = require('express')

const { getGroups, getGroupById, createGroup, updateGroup, removeGroup, getStudentsByGroup } = require('../services/groups')

const router = express.Router()


//API

router.get('/', async (req, res) => {
    try {
        const data = await getGroups()
        res.send(data)
    } catch (error) {
        console.error('Error fetching groups:', error)
        res.status(500).send({ error: 'Internal server error' })
    }
})


router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const group = await getGroupById(id)
        if (!group) {
            return res.status(404).send({ message: 'Group not found' })
        }
        res.send(group)
    } catch (error) {
        console.error('Error fetching group:', error)
        res.status(500).send({ error: 'Internal server error' })
    }
})


router.post('/', async (req, res) => {
    const { body } = req

    try {
        const response = await createGroup(body)
        res.send(response)
    } catch (error) {
        console.error('Error creating group:', error)
        res.status(500).send({ error: 'Internal server error' })
    }
})


router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        const response = await updateGroup(body, id)
        res.send({ message: 'Group updated successfully', response, body: { ...body, id } })
    } catch (error) {
        console.error('Error updating group:', error)
        res.status(500).send({ error: 'Internal server error' })
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await removeGroup(id);
        if (response.deletedCount === 0) {
            return res.status(404).send({ message: 'Group not found' })
        }
        res.send({ message: 'Group deleted successfully', id, response })
    } catch (error) {
        console.error('Error deleting group:', error)
        res.status(500).send({ error: 'Internal server error' })
    }
})


router.get('/:id/students', async (req, res) => {
    try {
        const { id } = req.params
        const data = await getStudentsByGroup(id)
        res.send(data)
    } catch (error) {
        res.status(500).send({error})
    }
})


module.exports = router