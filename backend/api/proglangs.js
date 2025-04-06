const express = require('express')
const { getProglangs, getProglangById, createProglang, updateProglang, removeProglang } = require('../controllers/proglangController')

const router = express.Router()

router.get('/', getProglangs)
router.get('/:id', getProglangById)
router.post('/', createProglang)
router.put('/:id', updateProglang)
router.delete('/:id', removeProglang)

module.exports = router