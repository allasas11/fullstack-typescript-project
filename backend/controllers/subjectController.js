const Subject = require('../models/subjectModel')

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
    .populate({
      path: 'proglangs',
      model: 'Proglang',
      options: { strictPopulate: false }
    })
    res.send(subjects)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params
    const subject = await Subject.findById(id)
      .populate('proglangs')

    if (!subject) {
      return res.status(404).send({ error: 'Subject not found' })
    }

    res.send(subject)
  } catch (error) {
    res.status(500).send(error)
  }
}

const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body)
    await subject.save()

    res.send(subject)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateSubject = async (req, res) => {
  try {
    const { id } = req.params
    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updatedSubject) {
      return res.status(404).send({ error: 'Subject not found' });
    }

    const populatedSubject = await Subject.findById(updatedSubject._id)
      .populate('proglangs')

    res.send(populatedSubject)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message })
    }
    res.status(500).send(error)
  }
}

const removeSubject = async (req, res) => {
  try {
    const { id } = req.params
    const deletedSubject = await Subject.findByIdAndDelete(id)

    if (!deletedSubject) {
      return res.status(404).send({ error: 'Subject not found' })
    }

    res.send(deletedSubject)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  removeSubject
}