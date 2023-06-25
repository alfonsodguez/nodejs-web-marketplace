const express = require('express')
const session = require('express-session')
const viewEngine = require('express-handlebars')
const cookieParser = require('cookie-parser')

module.exports = (app) => {
    app.use(cookieParser())
    app.use(express.urlencoded({extended: false}))
    app.use(express.json()) 
    //--------- configuracion session ------------
    app.use(session({
        secret: process.env.SECRET_KEY_SESSION,
        resave: false,
        saveUninitialized :false,
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: 360000,
            secure: false
        }
    }))
    app.use('/public', express.static('public', { index: false, maxAge: '1d' }))
    app.set('views', __dirname + '/../views')
    app.engine('hbs', viewEngine.create({
        extname: 'hbs',
        defaultLayout: '__Layout',
        layoutsDir: __dirname + '/../views/shared/Layouts',
        partialsDir: __dirname + '/../views/shared/Partials',
        helpers: {
            split: (cadena, separador, posicion) => cadena.split(separador)[posicion],
            ifcond: (value1, operador, value2) => {
                const operadores = {
                    '==': function(a, b) { return a == b },
                    '!=': function(a, b) { return a != b },
                    '<':  function(a, b) { return a < b  },
                    '>':  function(a, b) { return a > b  },
                    '<=': function(a, b) { return a <= b },
                    '>=': function(a, b) { return a >= b },
                    '&&': function(a, b) { return a && b },
                    '||': function(a, b) { return a || b }
                }
                return operadores[operador](value1, value2)
            },
            operacion: (valor1, operador, valor2) => {
                switch (operador) {
                    case '+':
                        return valor1 + valor2
                    case '-':
                        return valor1 - valor2
                    case '*':
                        return valor1 * valor2
                    case '/':
                        return valor1 / valor2
                }
            }
        }
    }).engine)
}