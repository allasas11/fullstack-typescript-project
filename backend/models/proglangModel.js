const mongoose = require('mongoose')

const proglangSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 2,
      maxLength: 50
  },
  description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, { timestamps: true })

  const Proglang = mongoose.model('Proglang', proglangSchema)

  module.exports = Proglang