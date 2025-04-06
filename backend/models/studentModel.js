const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2],
      maxLength: [50]
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minLength: [2],
      maxLength: [50]
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
    interests: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Proglang'
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true
    }
  }, { timestamps: true })

  const Student = mongoose.model('Student', studentSchema)

  module.exports = Student