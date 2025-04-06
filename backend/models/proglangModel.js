const mongoose = require('mongoose')

const proglangSchema = new mongoose.Schema({
    name: String,
    description: String
  })

  const Proglang = mongoose.model('Proglang', proglangSchema)

  module.exports = Proglang