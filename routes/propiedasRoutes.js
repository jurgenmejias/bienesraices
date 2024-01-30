import express from 'express'
import { body } from 'express-validator'
import {admin, crear, guardar, agregarImagen, almacenarImagen, editar, eliminar, cambiarEstado, guardarCambios, mostrarPropiedad, enviarMensaje, verMensajes} from '../controllers/propiedadController.js'
import protegerRuta from '../middleware/protegerRuta.js'
import upload from '../middleware/subirImagen.js'
import identificarUsuario from '../middleware/identificarUsuario.js'

const router = express.Router()

router.get('/mis-propiedades', protegerRuta, admin)
router.get('/propiedades/crear', protegerRuta, crear)
router.post('/propiedades/crear', protegerRuta,
    body('titulo').notEmpty().withMessage('El Titulo del anuncio es obligatorio.'),
    body('descripcion').notEmpty().withMessage('La descripcion no puede ir vacia.')
    .isLength({max: 300}).withMessage('La descripcion es muy larga.'),
    body('categoria').isNumeric().withMessage('Seleccione una categoria'),
    body('precio').isNumeric().withMessage('Seleccione un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Seleccione la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Seleccione la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Seleccione la cantidad de banios'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardar
)

router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen)

// single porque es una sola imagen, si fueran mas seria .array
router.post('/propiedades/agregar-imagen/:id', 
    protegerRuta,
    upload.single('imagen'),
    almacenarImagen
)

router.get('/propiedades/editar/:id', protegerRuta, editar)

router.post('/propiedades/editar/:id', protegerRuta,
    body('titulo').notEmpty().withMessage('El Titulo del anuncio es obligatorio.'),
    body('descripcion').notEmpty().withMessage('La descripcion no puede ir vacia.')
    .isLength({max: 300}).withMessage('La descripcion es muy larga.'),
    body('categoria').isNumeric().withMessage('Seleccione una categoria'),
    body('precio').isNumeric().withMessage('Seleccione un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Seleccione la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Seleccione la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Seleccione la cantidad de banios'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardarCambios
)

router.post('/propiedades/eliminar/:id', protegerRuta, eliminar)

router.put('/propiedades/:id',
    protegerRuta,
    cambiarEstado
)


// Area Publica
router.get('/propiedad/:id', identificarUsuario, mostrarPropiedad)

// Almacenar los mensajes
router.post('/propiedad/:id',
    identificarUsuario,
    body('mensaje').isLength({min: 10}).withMessage('El mensaje no puede ir vacio o es muy corto.'),
    enviarMensaje)

router.get('/mensajes/:id', protegerRuta, verMensajes)


export default router