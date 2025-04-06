const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: {
      type: String,
      trim: true,
      required: [true],
      unique: true,
      minLength: [2],
      maxLength: [50]
  },
  description: {
      type: String,
      trim: true,
      required: [true],
      minLength: [10]
  },
  students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
  }],
  lecturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecturer',
      required: [true]
  }
}, { timestamps: true })

  const Group = mongoose.model('Group', groupSchema)

  module.exports = Group