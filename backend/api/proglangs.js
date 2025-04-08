const express = require('express')
const { getProglangs, getProglangById, createProglang, updateProglang, removeProglang } = require('../controllers/proglangController')
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getProglangs)
router.get('/:id', authMiddleWare, getProglangById)
router.post('/', authMiddleWare, createProglang)
router.put('/:id', authMiddleWare, updateProglang)
router.delete('/:id', authMiddleWare, removeProglang)

module.exports = router