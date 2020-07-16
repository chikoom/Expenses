const express = require('express')
const bodyParser = require('body-parser')
const router = require('./server/routes/api')
const mongoose = require('mongoose')

const PORT = 3333
const app = express()
mongoose.connect("mongodb://localhost/expenses")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',router)

app.listen(PORT, function(){
  console.log(`Server Running PORT ${PORT}`)
})