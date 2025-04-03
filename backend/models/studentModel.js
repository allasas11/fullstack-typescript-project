const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    interests: [String]
  })

  const Student = mongoose.model('Student', studentSchema)




  module.exports = Student