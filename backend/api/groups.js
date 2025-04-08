const express = require('express')
const { getGroups, getGroupById, createGroup, updateGroup, removeGroup } = require('../controllers/groupController')
const authMiddleWare = require('../middlewares/authMiddleware')


const router = express.Router()

router.get('/', getGroups)
router.get('/:id', authMiddleWare, getGroupById)
router.post('/', authMiddleWare, createGroup)
router.put('/:id', authMiddleWare, updateGroup)
router.delete('/:id', authMiddleWare, removeGroup)


module.exports = router