import multer from 'multer'
import path from 'path'
import { generarId } from '../helpers/tokens.js'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads/') //Si se ejecuta es porque todo salio bien
    },
    filename: function(req, file, cb){
        cb(null, generarId() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

export default upload