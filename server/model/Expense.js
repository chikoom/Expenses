const mongoose = require('mongoose')
const timeZone = require('mongoose-timezone');

const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name:String,
  amount:Number,
  date: Date,
    subDocument: {
        subDate: {
            type: Date,
        },
    },
  group:String
})

//Schema.plugin(timeZone, { paths: ['date', 'subDocument.subDate'] });
const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
