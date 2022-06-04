require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const db = require('../db/db')
const cors = require('cors')
const mainroute = require('../src/routes/routes')
app.use(cors())
app.use(express.json())

app.use('/main',mainroute)

app.get('/',(req,res)=>{
    res.send('hello from server page')
})
const Dates = new Date().toDateString()
console.log(Dates)

app.listen(port,()=>{
    console.log(`server running at ${port}`)
})