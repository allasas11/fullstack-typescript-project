const express = require('express')
const { getGroups, getGroupById, createGroup, updateGroup, removeGroup } = require('../controllers/groupController')

const router = express.Router()

router.get('/', getGroups)
router.get('/:id', getGroupById)
router.post('/', createGroup)
router.put('/:id', updateGroup)
router.delete('/:id', removeGroup)


module.exports = router