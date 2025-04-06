const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
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
  proglangs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proglang'
  }]
}, { timestamps: true })

  const Subject = mongoose.model('Subject', subjectSchema)

  module.exports = Subject