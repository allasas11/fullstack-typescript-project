const mongoose = require('mongoose')

const lecturerSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number
  })

  const Lecturer = mongoose.model('Lecturer', lecturerSchema)

  module.exports = Lecturer