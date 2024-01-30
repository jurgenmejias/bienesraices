// const express = require('express') //CommonJs
import express from 'express' //ECMA Modules
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import propiedadesRoutes from './routes/propiedasRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import db from './config/db.js'

// Crear la app
const app = express()

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({extended: true}))

// Habilitar Cookie Parser
app.use(cookieParser())

// Habilitar CSurf
app.use(csrf({cookie: true}))


// Conexion a la base de datos
try {
    await db.authenticate();
    // db.sync() 
    console.log('Conexion correcta a la base de datos');
    
} catch (error) {
    console.log(error);
}

// Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta Publica
app.use( express.static('public') )

// Routing
app.use('/', appRoutes)
app.use('/auth', userRoutes)
app.use('/', propiedadesRoutes)
app.use('/api', apiRoutes)

// Definir un puerto y arrancar proyecto
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("El servidor esta en linea");
})