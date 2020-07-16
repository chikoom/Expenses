const express = require('express')
const bodyParser = require('body-parser')
const router = require('./server/routes/api')

const PORT = 3333
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',router)

app.listen(PORT, function(){
  console.log(`Server Running PORT ${PORT}`)
})