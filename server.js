const express = require('express')
const bodyParser = require('body-parser')
const router = require('./server/routes/api')
const mongoose = require('mongoose')
const path = require('path')

const PORT = 3333
const app = express()
mongoose.connect("mongodb://localhost/expenses", { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',router)

app.listen(PORT, function(){
  console.log(`Server Running PORT ${PORT}`)
})