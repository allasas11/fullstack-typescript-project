const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: String,
    description: String
  })

  const Group = mongoose.model('Group', groupSchema)




  module.exports = Group