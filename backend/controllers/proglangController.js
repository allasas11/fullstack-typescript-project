const mongoose = require('mongoose')
const Proglang = require('../models/proglangModel')

const getProglangs = async (req, res) => {
  try {
    const proglangs = await Proglang.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: '_id', 
          foreignField: 'interests', 
          as: 'students', 
        }
      }
    ])
    res.send(proglangs)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getProglangById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid programming language ID' })
    }


    const proglang = await Proglang.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id', 
          foreignField: 'interests', 
          as: 'students', 
        }
      }
    ])

    if (proglang.length === 0) {
      return res.status(404).send({ error: 'Programming language not found' })
    }

    res.send(proglang[0])
  } catch (error) {
    console.error(error)
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