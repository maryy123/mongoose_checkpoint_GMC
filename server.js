const express=require('express')
const connectDB=require('./config/connectDB')

const app=express()
require('dotenv').config()

connectDB()

// global Middleware
app.use(express.json())

//API Middleware
app.use('/api/person',require('./router/person'))



const PORT=process.env.PORT

app.listen(PORT,(err)=>{
    err ? console.error(err) :console.log(`server running on port: ${PORT}`)
})
