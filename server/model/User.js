const mongoose = require('mongoose')
const Expense = require('./Expense')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username:{type: String, required:true},
  expenses:[{type:Schema.Types.ObjectId, ref:'Expense'}]
})
const User = mongoose.model('User', userSchema)

module.exports = User
