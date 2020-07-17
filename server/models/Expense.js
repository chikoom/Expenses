const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name:     {type:String, default:'Some stuff'},
  amount:   {type:Number, required:true},
  date:     {type:Date, required:true},
  business: {type:Schema.Types.ObjectId, ref:"Business", default:"NA"},
  category: {type:Schema.Types.ObjectId, ref:"Category", default:"Other"}
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
