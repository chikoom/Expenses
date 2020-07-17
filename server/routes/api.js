const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const moment = require('moment')
const Expense = require('../model/Expense')
const User = require('../model/User')
const Category = require('../model/Category')

const dateFormatter = (req, res, next) => {
  req.body.date = moment(new Date(req.body.date)).format("LLLL")
  if(req.query.d1)
    req.query.d1 = moment(new Date(req.query.d1)).format("LLLL")
  if(req.query.d2)
    req.query.d2 = moment(new Date(req.query.d2)).format("LLLL")
  next()
}

router.get('/sanity', (req,res)=>{
  res.send('OK')
})

router.post('/new', dateFormatter, (req, res)=>{
  const newExpense = new Expense({
    name:req.body.name,
    amount:Number(req.body.amount),
    date:req.body.date,
    group:req.body.group
  })
  const savePromise = newExpense.save()
  savePromise.then(data => {
    console.log(`I spent ${data.amount} on ${data.group}`)
  }).catch(err => {
    console.log(err)
  }).finally(data => {
    res.send('COMPLETED')
  })
})


router.put('/update', (req,res)=>{
  const groupFrom = req.body.group1
  const groupTo = req.body.group2
  Expense.findOneAndUpdate({group:groupFrom},{group:groupTo},{new:true}).exec(function(err,data){
    console.log(data)
    res.send({name:data.name, newGroup:data.group})
  })
})

router.get('/expenses/:group', (req,res)=>{
  const group = req.params.group
  const total = req.query.total
  if(total){
    Expense.aggregate([
      { $match: { group } },
      { $group: { _id: null, amount: { $sum: "$amount" } } }
    ]).exec(function(err, data){
      res.send(String(data[0]["amount"]))
    })
  }else{
    Expense.find({group}).exec(function(err, data){
      res.send(data)
    })
  }
})

router.get('/expenses',dateFormatter, (req,res)=>{
  console.log(req.query.d1)
  console.log(req.query.d2)
  const firstDate = req.query.d1
  let filterQuery = {}
  if(firstDate){
    const secondDate = req.query.d2 || new Date()
    filterQuery = { date: { $gte: firstDate, $lte: secondDate}}
  }
  Expense.find(filterQuery).sort({date: -1}).exec(function(err, data){
    res.send(data)
  })
})

router.get('/expenses/user/:userId',dateFormatter, (req,res)=>{
  const userId = req.params.userId
  const firstDate = req.query.d1
  let filterQuery = { path:'expenses', options: { sort: { 'date': -1 } } }
  if(firstDate){
    const secondDate = req.query.d2 || new Date()
    filterQuery.match = { date: {$gte: firstDate, $lte: secondDate}}
  }
  console.log(filterQuery)
  User.findById(userId).populate(filterQuery).exec(function(err, data){
    res.send(data)
  })
})

router.get('/users', (req,res) => {
  User.find({}).exec(function(err, data){
    res.send(data)
  })
})

router.get('/users/:id', (req,res) => {
  userId = req.params.id
  User.findById(userId).exec(function(err, data){
    res.send(data)
  })
})

router.get('/categories', (req,res) => {
  Category.find({}).exec(function(err, data){
    res.send(data)
  })
})

module.exports = router