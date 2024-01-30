import express from 'express'
import { inicio, categorias, pagina404, buscador } from '../controllers/appController.js';

const router = express.Router()

// Pagina de inicio
router.get('/', inicio)

// Categorias
router.get('/categorias/:id', categorias)

// Pagina 404
router.get('/404', pagina404)

// Buscador
router.post('/buscador', buscador)


export default router;