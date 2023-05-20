const express = require('express')                           
const mongoose = require('mongoose')
const config  = require('./config/middleware')  
const routing = require('./config/routingMAIN') 

require('dotenv').config()

const app = express()  
config(app)    
routing(app)   
app.listen(3000)    

mongoose.connect(process.env.MONGO, (err, data) => {
    if (!err) {
        console.log('Conexion Mongo ok')
    } else {
        console.log('Error en la conexion a Mongo: ', err)
    }
})