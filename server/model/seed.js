const Expense = require('./Expense')
const mongoose = require('mongoose')
const expensesData = require('./dummyExpenses.json')
mongoose.connect("mongodb://localhost/expenses")

expensesData.forEach(expenseData => {
  newExpense = new Expense({
    name:expenseData.item,
    amount:Number(expenseData.amount),
    date:new Date(expenseData.date),
    group:expenseData.group
  })
  newExpense.save()
})
