const mongoose = require('mongoose')

const lecturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
    validate: {
        validator: Number.isInteger,
        message: 'Age must be an integer'
    }
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }]
}, { timestamps: true })

  const Lecturer = mongoose.model('Lecturer', lecturerSchema)

  module.exports = Lecturer