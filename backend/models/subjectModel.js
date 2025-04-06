const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: String,
    description: String
  })

  const Subject = mongoose.model('Subject', subjectSchema)

  module.exports = Subject