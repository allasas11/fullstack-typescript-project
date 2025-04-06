const Proglang = require('../models/proglangModel')

const getProglangs = async (req, res) => {
  try {
    const proglangs = await Proglang.find()
    res.send(proglangs)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getProglangById = async (req, res) => {
  try {
    const { id } = req.params
    const proglang = await Proglang.findById(id)

    if (!proglang) {
      return res.status(404).send({ error: 'Programming language not found' })
    }

    res.send(proglang)
  } catch (error) {
    res.status(500).send(error)
  }
}

const createProglang = async (req, res) => {
  try {
    const proglang = new Proglang(req.body)
    await proglang.save()

    res.send(proglang)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateProglang = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProglang = await Proglang.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } 
    )

    if (!updatedProglang) {
      return res.status(404).send({ error: 'Programming language not found' });
    }

    res.send(updatedProglang);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message })
    }
    res.status(500).send(error);
  }
}

const removeProglang = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProglang = await Proglang.findByIdAndDelete(id)

    if (!deletedProglang) {
      return res.status(404).send({ error: 'Programming language not found' })
    }

    res.send(deletedProglang)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getProglangs,
  getProglangById,
  createProglang,
  updateProglang,
  removeProglang
}