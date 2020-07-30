const Expense = require('./Expense')
const User = require('./User')
const Category = require('./Category')
const mongoose = require('mongoose')
const expensesData = require('./dummyExpenses.json')
mongoose.connect("mongodb://localhost/expenses")

// const idan = new User({username: "Idan"})
// const kundi = new User({username: "Kundofon"})
// const users = [idan,kundi]

// users.forEach(user => user.save())

// const categories = [
//   new Category({name:'fun'}),
//   new Category({name:'food'}),
//   new Category({name:'rent'}),
//   new Category({name:'bills'}),
//   new Category({name:'general'})
// ]

// categories.forEach(category => category.save())

// expensesData.forEach(expenseData => {
//   const categoryName = expenseData.group
//   const userSkip = Math.floor(Math.random() * 2)

//   Category.find({name:categoryName}).exec(function(err,data){
//     catName = (data[0])?data[0].name:'general'
//     User.find({}).skip(userSkip).exec(function(err,data){
//       userRetuned = String(data[0].username)
//       const newExpense = new Expense({
//         name:expenseData.item,
//         amount:Number(expenseData.amount),
//         date:new Date(expenseData.date),
//         group:catName
//       })
//       newExpense.save()
//       console.log(newExpense)
//       User.findOneAndUpdate({username: userRetuned}, {$push: {expenses: newExpense}}).exec(function(err,data){
//         console.log(data)
//       })
//     })
//   })
// })


/** WARNING WARNING WARNING WARNING WARNING WARNING */
/** WARNING WARNING WARNING WARNING WARNING WARNING */
/** WARNING WARNING WARNING WARNING WARNING WARNING */
/** WARNING WARNING WARNING WARNING WARNING WARNING */
/** WARNING WARNING WARNING WARNING WARNING WARNING */

// Expense.remove({}, function(err) { 
//   console.log('collection removed') 
// })

// mongoose.connection.collections['expenses'].drop( function(err) {
//   console.log('collection dropped');
// })

