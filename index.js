const express  = require('express')                           
const mongoose = require('mongoose')
const config   = require('./config/config')  
const routing  = require('./config/main') 
const error    = require('./middlewares/error')

require('dotenv').config()

const app = express()  
config(app)    
routing(app)   
error(app)
app.listen(3000)    

main()
.then(() => console.log('Conexión mongo ok'))
.catch(err => console.log('Error conexión mongo', err))

async function main() {
    mongoose.connect(process.env.MONGO_URI)
}