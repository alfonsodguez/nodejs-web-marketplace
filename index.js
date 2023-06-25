const express = require('express')                           
const mongoose = require('mongoose')
const config  = require('./config/middleware')  
const routing = require('./config/main') 

require('dotenv').config()

const app = express()  
config(app)    
routing(app)   
app.listen(3000)    

main()
.then(() => console.log('Conexion mongo ok'))
.catch(err => console.log('Error mongo conexion', err))

async function main() {
    mongoose.connect(process.env.MONGO_URI)
}