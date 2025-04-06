const Lecturer = require('../models/lecturerModel')


const getLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find()
      .populate('subjects') 
    res.send(lecturers)
  } catch (error) {
    res.status(500).send(error)
  }
}


const getLecturerById = async (req, res) => {
  try {
    const { id } = req.params
    const lecturer = await Lecturer.findById(id)
      .populate('subjects') 

    if (!lecturer) {
      return res.status(404).send({ error: 'Lecturer not found' })
    }

    res.send(lecturer)
  } catch (error) {
    res.status(500).send(error)
  }
}


const createLecturer = async (req, res) => {
  try {
    const lecturer = new Lecturer(req.body)
    await lecturer.save()

    res.send(lecturer)
  } catch (error) {
    res.status(500).send(error)
  }
}


const updateLecturer = async (req, res) => {
  try {
    const { id } = req.params
    const updatedLecturer = await Lecturer.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updatedLecturer) {
      return res.status(404).send({ error: 'Lecturer not found' })
    }


    const populatedLecturer = await Lecturer.findById(updatedLecturer._id)
      .populate('subjects')

    res.send(populatedLecturer)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message })
    }
    res.status(500).send(error)
  }
}


const removeLecturer = async (req, res) => {
  try {
    const { id } = req.params
    const deletedLecturer = await Lecturer.findByIdAndDelete(id)

    if (!deletedLecturer) {
      return res.status(404).send({ error: 'Lecturer not found' })
    }

    res.send(deletedLecturer)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  removeLecturer
};