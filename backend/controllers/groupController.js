const Group = require('../models/groupModel')

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('students')
      .populate('lecturerId')
    res.send(groups)
  } catch (error) {
    res.status(500).send(error)
  }
}


const getGroupById = async (req, res) => {
  try {
    const { id } = req.params
    const group = await Group.findById(id)
      .populate('students')
      .populate('lecturerId')

    if (!group) {
      return res.status(404).send({ error: 'Group not found' })
    }

    res.send(group)
  } catch (error) {
    res.status(500).send(error)
  }
}


const createGroup = async (req, res) => {
  try {
    const group = new Group(req.body)
    await group.save()
    res.send(group)
  } catch (error) {
    res.status(500).send(error)
  }
}


const updateGroup = async (req, res) => {
  try {
    const { id } = req.params
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )

    if (!updatedGroup) {
      return res.status(404).send({ error: 'Group not found' })
    }

    const populatedGroup = await Group.findById(updatedGroup._id)
      .populate('students')
      .populate('lecturerId')

    res.send(populatedGroup)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message })
    }
    res.status(500).send(error)
  }
}


const removeGroup = async (req, res) => {
  try {
    const { id } = req.params
    const deletedGroup = await Group.findByIdAndDelete(id)

    if (!deletedGroup) {
      return res.status(404).send({ error: 'Group not found' })
    }

    res.send(deletedGroup)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  removeGroup
}