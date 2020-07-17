const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessSchema = new Schema({
  name: {type:String, default:'NA'}
})

const Business = mongoose.model('Business', businessSchema)

module.exports = Business
