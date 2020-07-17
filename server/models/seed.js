const Expense   = require('./Expense')
const User      = require('./User')
const Category  = require('./Category')
const Business  = require('./Business')
const mongoose  = require('mongoose')
const expensesData = require('./dummyExpenses.json')
mongoose.connect("mongodb://localhost/myExpenses")


const users = [
  new User({username: "Idan", expenses:[], categories:[]}), 
  new User({username: "Kundofon", expenses:[], categories:[]})
]

const items = [
  'stuff',
  'items',
  'things'
]

expensesData.forEach(expenseData => {

  const currentUser = users[Math.floor(Math.random() * 2)]
  const currentItem = items[Math.floor(Math.random() * 3)]
  const categoryName = expenseData.group || 'general'
  const CurrentCategory = new Category({name:categoryName})

  const newExpense = new Expense({
    name:       currentItem,
    business:   new Business({name:expenseData.item}),
    amount:     Number(expenseData.amount),
    date:       new Date(expenseData.date),
    category:   CurrentCategory
  })

  currentUser.expenses.push(newExpense)
  const existingCat = currentUser.categories.find(singleCategory => singleCategory.name === categoryName)
  if(!existingCat) currentUser.categories.push()


})


// users.forEach(user => user.save())
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

